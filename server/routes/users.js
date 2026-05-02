const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const DB_PATH = path.join(__dirname, '..', '..', 'server', 'database', 'terrazza.db');

function getDb() {
  return new sqlite3.Database(DB_PATH);
}

// Get profile
router.get('/profile', (req, res) => {
  const db = getDb();
  db.get(
    'SELECT id, email, first_name, last_name, phone, avatar, role, preferences, created_at FROM users WHERE id = ?',
    [req.user.id],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ user });
    }
  );
});

// Update profile
router.patch('/profile', (req, res) => {
  const { first_name, last_name, phone, avatar, preferences } = req.body;
  const db = getDb();
  
  db.run(
    'UPDATE users SET first_name = ?, last_name = ?, phone = ?, avatar = ?, preferences = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [first_name, last_name, phone, avatar, preferences ? JSON.stringify(preferences) : null, req.user.id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ message: 'Profile updated' });
    }
  );
});

// Get favorites
router.get('/favorites', (req, res) => {
  const db = getDb();
  db.all(
    `SELECT p.* FROM favorites f JOIN properties p ON f.property_id = p.id WHERE f.user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ favorites: rows });
    }
  );
});

// Add favorite
router.post('/favorites/:propertyId', (req, res) => {
  const db = getDb();
  db.run(
    'INSERT OR IGNORE INTO favorites (user_id, property_id) VALUES (?, ?)',
    [req.user.id, req.params.propertyId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to add favorite' });
      res.json({ message: 'Added to favorites' });
    }
  );
});

// Remove favorite
router.delete('/favorites/:propertyId', (req, res) => {
  const db = getDb();
  db.run(
    'DELETE FROM favorites WHERE user_id = ? AND property_id = ?',
    [req.user.id, req.params.propertyId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to remove favorite' });
      res.json({ message: 'Removed from favorites' });
    }
  );
});

module.exports = router;
