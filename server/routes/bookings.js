const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { DB_PATH } = require('../database');

const router = express.Router();

function getDb() {
  return new sqlite3.Database(DB_PATH);
}

// Create booking
router.post('/', (req, res) => {
  const { property_id, check_in, check_out, guests, special_requests } = req.body;
  const user_id = req.user.id;

  if (!property_id || !check_in || !check_out) {
    return res.status(400).json({ error: 'Property, check-in, and check-out dates required' });
  }

  const db = getDb();
  
  // Get property price
  db.get('SELECT price_per_night FROM properties WHERE id = ?', [property_id], (err, property) => {
    if (err || !property) return res.status(404).json({ error: 'Property not found' });
    
    const nights = Math.ceil((new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24));
    const total_price = nights * property.price_per_night;

    db.run(
      'INSERT INTO bookings (user_id, property_id, check_in, check_out, guests, total_price, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, property_id, check_in, check_out, guests || 1, total_price, special_requests],
      function(err) {
        if (err) return res.status(500).json({ error: 'Booking failed' });
        
        res.status(201).json({
          message: 'Booking created',
          booking_id: this.lastID,
          total_price,
          status: 'pending'
        });
      }
    );
  });
});

// Get user bookings
router.get('/my-bookings', (req, res) => {
  const db = getDb();
  db.all(
    `SELECT b.*, p.title as property_title, p.main_image, p.location 
     FROM bookings b 
     JOIN properties p ON b.property_id = p.id 
     WHERE b.user_id = ? 
     ORDER BY b.created_at DESC`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ bookings: rows });
    }
  );
});

// Cancel booking
router.patch('/:id/cancel', (req, res) => {
  const db = getDb();
  db.run(
    'UPDATE bookings SET status = "cancelled", updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Cancel failed' });
      res.json({ message: 'Booking cancelled' });
    }
  );
});

module.exports = router;
