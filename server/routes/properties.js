const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const DB_PATH = path.join(__dirname, '..', '..', 'server', 'database', 'terrazza.db');

function getDb() {
  return new sqlite3.Database(DB_PATH);
}

// Get all properties
router.get('/', (req, res) => {
  const db = getDb();
  db.all('SELECT * FROM properties WHERE is_active = 1 ORDER BY is_featured DESC, created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ properties: rows.map(p => ({...p, amenities: JSON.parse(p.amenities || '[]'), images: JSON.parse(p.images || '[]')})) });
  });
});

// Get single property
router.get('/:slug', (req, res) => {
  const db = getDb();
  db.get('SELECT * FROM properties WHERE slug = ? AND is_active = 1', [req.params.slug], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Property not found' });
    
    row.amenities = JSON.parse(row.amenities || '[]');
    row.images = JSON.parse(row.images || '[]');
    res.json({ property: row });
  });
});

module.exports = router;
