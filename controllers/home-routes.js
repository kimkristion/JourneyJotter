const router = require('express').Router();

router.get('/home', async (req, res) => {
    res.render('home');
});

module.exports = router;