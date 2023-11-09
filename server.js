const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
require('dotenv').config();
const User = require('./models/User');

const { sequelize } = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
    try {
        // Extract the data from the request body
        const { username, email, password } = req.body;

        console.log('Name:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // Create a new user in the User model
        const newUser = await User.create({
            username,
            email,
            password,
        });

        // Handle the response, e.g., send a success message
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        // Handle errors and respond with a 500 status code and an error message
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
