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
app.use(express.static(path.join(__dirname, 'jack-home-page')));
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