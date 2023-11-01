const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, './public')));
app.use(require('./controllers/home-routes'));

const db = mysql.createConnection(
    {

        host: process.env.local_host,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to database`)
);

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});

app.post('/api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.query(query, [username, email, password]);

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

});

db.on('error', (err) => {
    console.error('Database connection error:', err);
});