const express = require('express');
require('dotenv').config();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const sequelize = require('./config/connection');
const session = require('express-session'); // Added session import
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, './public')));
app.use(require('./controllers/home-routes'));
app.use(require('./controllers/login-routes'));
app.use(require('./controllers/map-route'));

app.use((req, res) => {
    res.status(404).end();
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});