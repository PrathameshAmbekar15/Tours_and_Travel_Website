const express = require('express');
const router = express.Router();
const db = require('../database');

// Save a contact message
router.post('/', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, message], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Message sent successfully', id: this.lastID });
    });
});

// Get all contact messages (for history)
router.get('/', (req, res) => {
    const sql = `SELECT * FROM contacts ORDER BY created_at DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
