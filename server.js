const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./server/routes/auth');
const bookingRoutes = require('./server/routes/bookings');
const propertyRoutes = require('./server/routes/properties');
const userRoutes = require('./server/routes/users');
const adminRoutes = require('./server/routes/admin');
const contactRoutes = require('./server/routes/contact');
const { authenticateToken, requireAdmin } = require('./server/middleware/auth');
const { initDatabase } = require('./server/database');

const app = express();
const PORT = process.env.PORT || 3000;

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

const PUBLIC_DIR = __dirname;

// Static files
app.use(express.static(path.join(PUBLIC_DIR, 'public')));

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

// SPA routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'public', 'profile.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/booking', (req, res) => res.sendFile(path.join(__dirname, 'public', 'booking.html')));

// React SPA — TerraZa Hero (static files + index fallback)
app.use('/terraza', express.static(path.join(PUBLIC_DIR, 'public', 'terraza'), { index: 'index.html' }));
app.get('/terraza', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'public', 'terraza', 'index.html')));
app.get('/terraza/*', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'public', 'terraza', 'index.html')));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server (for local dev)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌊 Terrazza Concierge MVP running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 API: http://localhost:${PORT}/api`);
  });
}

// Export for serverless (Vercel)
module.exports = app;