const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcrypt');

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

app.post('/signup', async (req, res) => {
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

app.get('/login', (req, res) => {
    // Handle the login form rendering here
    res.render('login'); // Render the login form
});

// User login (POST request) for processing login
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Find a user with the provided email
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            // User with the provided email exists, so check the password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Password matches, so allow the user to log in
                res.redirect('/home'); // Redirect to the profile page or perform other actions
            } else {
                // Password does not match, display an error message
                res.render('login', { error: 'Invalid password' }); // Render the login form with an error message
            }
        } else {
            // No user found with the provided email, display an error message
            res.render('login', { error: 'User not found' }); // Render the login form with an error message
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
