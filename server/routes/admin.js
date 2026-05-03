const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { DB_PATH } = require('../database');

const router = express.Router();

function getDb() {
  return new sqlite3.Database(DB_PATH);
}

// Dashboard stats
router.get('/stats', (req, res) => {
  const db = getDb();
  const stats = {};
  
  db.get('SELECT COUNT(*) as count FROM users', [], (err, row) => {
    stats.totalUsers = row.count;
    db.get('SELECT COUNT(*) as count FROM bookings', [], (err, row) => {
      stats.totalBookings = row.count;
      db.get('SELECT COUNT(*) as count FROM properties', [], (err, row) => {
        stats.totalProperties = row.count;
        db.get('SELECT COUNT(*) as count FROM contacts WHERE status = "new"', [], (err, row) => {
          stats.newMessages = row.count;
          res.json(stats);
        });
      });
    });
  });
});

// All bookings
router.get('/bookings', (req, res) => {
  const db = getDb();
  db.all(
    `SELECT b.*, u.email, u.first_name, u.last_name, p.title as property_title 
     FROM bookings b 
     JOIN users u ON b.user_id = u.id 
     JOIN properties p ON b.property_id = p.id 
     ORDER BY b.created_at DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ bookings: rows });
    }
  );
});

// All users
router.get('/users', (req, res) => {
  const db = getDb();
  db.all(
    'SELECT id, email, first_name, last_name, role, created_at, last_login, is_active FROM users ORDER BY created_at DESC',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ users: rows });
    }
  );
});

// All contacts
router.get('/contacts', (req, res) => {
  const db = getDb();
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ contacts: rows });
  });
});

// Update booking status
router.patch('/bookings/:id/status', (req, res) => {
  const { status } = req.body;
  const db = getDb();
  db.run(
    'UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ message: 'Status updated' });
    }
  );
});

module.exports = router;
