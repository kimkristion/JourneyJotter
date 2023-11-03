const express = require('express');
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
app.use(require('./controllers/login-routes'));

const db = require('./config/connection');

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