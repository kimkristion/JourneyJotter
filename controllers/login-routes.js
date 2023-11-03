const router = require('express').Router();
const db = require('../config/connection'); // Adjust the import path as needed

// GET route to render the login form
router.get('/login', async (req, res) => {
    res.render('login');
});

// POST route to handle form submissions
router.post('/login', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    new Promise((resolve, reject) => {
        db.execute(query, [username, email, password], (err, results) => {
            if (err) {
                reject(err);
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
});

module.exports = router;