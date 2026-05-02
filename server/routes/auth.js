const express = require('express');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { generateToken } = require('../middleware/auth');

const router = express.Router();
const DB_PATH = path.join(__dirname, '..', '..', 'server', 'database', 'terrazza.db');

function getDb() {
  return new sqlite3.Database(DB_PATH);
}

// Register
router.post('/register', async (req, res) => {
  const { email, password, first_name, last_name, phone } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, first_name, last_name, phone],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Email already registered' });
          }
          return res.status(500).json({ error: 'Registration failed' });
        }
        
        const user = { id: this.lastID, email, first_name, last_name, role: 'client' };
        const token = generateToken(user);
        
        res.status(201).json({
          message: 'Registration successful',
          token,
          user: { id: user.id, email, first_name, last_name, role: 'client' }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const db = getDb();
  db.get('SELECT * FROM users WHERE email = ? AND is_active = 1', [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    const token = generateToken(user);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone
      }
    });
  });
});

// Get current user
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No token' });

  const jwt = require('jsonwebtoken');
  const { JWT_SECRET } = require('../middleware/auth');
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    
    const db = getDb();
    db.get('SELECT id, email, first_name, last_name, role, avatar, phone, preferences FROM users WHERE id = ?', 
      [decoded.id], (err, user) => {
        if (err || !user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
      }
    );
  });
});

module.exports = router;
