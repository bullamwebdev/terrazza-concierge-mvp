const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { DB_PATH } = require('../database');

const router = express.Router();

function getDb() {
  return new sqlite3.Database(DB_PATH);
}

// Submit contact form
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message required' });
  }

  const db = getDb();
  db.run(
    'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, subject, message],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to send message' });
      
      // TODO: Send email notification
      res.status(201).json({ 
        message: 'Message received. Our concierge team will contact you shortly.',
        contact_id: this.lastID 
      });
    }
  );
});

module.exports = router;
