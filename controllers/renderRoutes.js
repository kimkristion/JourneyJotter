const router = require('express').Router();

router.get('/', (req, res) => {
    res.redirect('login');
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/home', (req, res) => {
    res.render('home');
});
router.get('/logs', (req, res) => {
    res.render('logpage');
});
router.get('/map', (req, res) => {
    res.render('map');
});

module.exports = router;

// All get routes that render our handlebar templates