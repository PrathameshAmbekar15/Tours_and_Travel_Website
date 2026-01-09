const express = require('express');
const router = express.Router();
const db = require('../database');

// Create a booking
router.post('/', (req, res) => {
    const { name, email, destination, date } = req.body;

    if (!name || !email || !destination || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `INSERT INTO bookings (name, email, destination, date) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, email, destination, date], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Booking successful', id: this.lastID });
    });
});

// Get all bookings (optional, for viewing data)
router.get('/', (req, res) => {
    const sql = `SELECT * FROM bookings ORDER BY created_at DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
