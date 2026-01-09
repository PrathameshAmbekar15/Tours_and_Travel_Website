const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// Direct users route for debugging (since /api/auth/users is 404ing)
const db = require('./database');
app.get('/api/all-users', (req, res) => {
    db.all(`SELECT id, name, email FROM users ORDER BY id DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Serve static files (AFTER API routes)
app.use(express.static(path.join(__dirname, './')));

// Serve the main page at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'tours.html'));
});

// Fallback for any other unmatched GET requests
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'tours.html'));
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
