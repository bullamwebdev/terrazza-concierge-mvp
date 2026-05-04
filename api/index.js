const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('../server/routes/auth');
const bookingRoutes = require('../server/routes/bookings');
const propertyRoutes = require('../server/routes/properties');
const userRoutes = require('../server/routes/users');
const adminRoutes = require('../server/routes/admin');
const contactRoutes = require('../server/routes/contact');
const { authenticateToken, requireAdmin } = require('../server/middleware/auth');
const { initDatabase } = require('../server/database');

const app = express();
const PUBLIC_DIR = process.env.VERCEL ? '/var/task' : path.join(__dirname, '..');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      mediaSrc: ["'self'", "https:", "blob:"],
      connectSrc: ["'self'"],
    }
  }
}));

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Debug endpoint
app.get('/api/debug-files', (req, res) => {
  const PUBLIC_DIR = process.env.VERCEL ? '/var/task' : path.join(__dirname, '..');
  const result = {
    publicDir: PUBLIC_DIR,
    publicExists: fs.existsSync(path.join(PUBLIC_DIR, 'public')),
    terrazaExists: fs.existsSync(path.join(PUBLIC_DIR, 'public', 'terraza')),
    terrazaFiles: []
  };
  
  if (result.terrazaExists) {
    result.terrazaFiles = fs.readdirSync(path.join(PUBLIC_DIR, 'public', 'terraza'));
  }
  
  res.json(result);
});

// TerraZa routes (before database init for faster response)
app.get('/terraza', (req, res) => {
  const htmlPath = path.join(PUBLIC_DIR, 'public', 'terraza', 'index.html');
  if (fs.existsSync(htmlPath)) {
    res.setHeader('Content-Type', 'text/html');
    res.send(fs.readFileSync(htmlPath));
  } else {
    res.status(404).json({ 
      error: 'TerraZa not found', 
      path: htmlPath,
      publicDir: path.join(PUBLIC_DIR, 'public'),
      publicExists: fs.existsSync(path.join(PUBLIC_DIR, 'public')),
      publicFiles: fs.existsSync(path.join(PUBLIC_DIR, 'public')) ? fs.readdirSync(path.join(PUBLIC_DIR, 'public')) : []
    });
  }
});

app.get('/terraza/assets/:file', (req, res) => {
  const filePath = path.join(PUBLIC_DIR, 'public', 'terraza', 'assets', req.params.file);
  if (fs.existsSync(filePath)) {
    const ext = req.params.file.split('.').pop();
    const mimeTypes = { js: 'application/javascript', css: 'text/css', mp4: 'video/mp4', svg: 'image/svg+xml' };
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    res.send(fs.readFileSync(filePath));
  } else {
    res.status(404).json({ error: 'Asset not found', path: filePath });
  }
});

app.get('/terraza/images/:file', (req, res) => {
  const filePath = path.join(PUBLIC_DIR, 'public', 'terraza', 'images', req.params.file);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Image not found', path: filePath });
  }
});

// Lazy database init middleware
let dbInitialized = false;
app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await initDatabase();
      dbInitialized = true;
    } catch (err) {
      console.error('DB init error:', err);
    }
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/admin', authenticateToken, requireAdmin, adminRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export for Vercel serverless
module.exports = app;