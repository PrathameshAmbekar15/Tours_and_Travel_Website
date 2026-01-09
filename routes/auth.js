const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database');

// Registration
router.post('/register', (req, res) => {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(Password, 10);

    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [Name, Email, hashedPassword], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', id: this.lastID });
    });
});

// Login
router.post('/login', (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [Email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = bcrypt.compareSync(Password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    });
});

// Get all registered users (for history)
router.get('/users', (req, res) => {
    const sql = `SELECT id, name, email FROM users ORDER BY id DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
