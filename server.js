/**
 * Local development server
 * Imports the Vercel-ready Express app from api/index.js
 * and adds static file serving + a listen port.
 */
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = require('./api/index.js');
const express = require('express');

const PUBLIC_DIR = path.join(__dirname, 'public');

// Root route fallback — serves the WiseGenerative landing page (BEFORE static to prevent redirect loop)
app.get('/', (req, res) => {
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Landing page not found', path: indexPath });
  }
});

// Animated Hero route — explicit handler (BEFORE static to prevent redirect loop)
app.get('/animated-hero', (req, res) => {
  const htmlPath = path.join(PUBLIC_DIR, 'animated-hero', 'index.html');
  if (fs.existsSync(htmlPath)) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(htmlPath);
  } else {
    res.status(404).json({ error: 'Animated hero not found', path: htmlPath });
  }
});

// Wise Thinker route — explicit handler (BEFORE static to prevent redirect loop)
app.get('/wise-thinker', (req, res) => {
  const htmlPath = path.join(PUBLIC_DIR, 'wise-thinker', 'index.html');
  if (fs.existsSync(htmlPath)) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(htmlPath);
  } else {
    res.status(404).json({ error: 'Wise Thinker not found', path: htmlPath });
  }
});

// Static file serving (AFTER route handlers to prevent directory redirects)
app.use(express.static(PUBLIC_DIR));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📄 Landing page:    http://localhost:${PORT}/`);
  console.log(`🎨 Animated Hero:   http://localhost:${PORT}/animated-hero`);
  console.log(`🏛️  TerraZa:         http://localhost:${PORT}/terraza`);
  console.log(`🔧 API Health:      http://localhost:${PORT}/api/health`);
  console.log(`🔧 API Debug Files: http://localhost:${PORT}/api/debug-files`);
});
