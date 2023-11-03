const router = require('express').Router();
const db = require('../config/connection'); // Adjust the import path as needed
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET route to render the login form
router.get('/login', async (req, res) => {
    res.render('login');
});

// POST route to handle form submissions
router.post('/login', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    // Hash and salt the password using bcrypt
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            new Promise((resolve, reject) => {
                db.execute(query, [username, email, hashedPassword], (dbErr, results) => {
                    if (dbErr) {
                        reject(dbErr);
                    } else {
                        resolve(results);
                    }
                });
            })
                .then(() => {
                    res.status(200).json({ message: 'User registered successfully' });
                })
                .catch((error) => {
                    console.error('Error registering user:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        }
    });
});

module.exports = router;
