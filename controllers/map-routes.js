const router = require('express').Router();

router.get('/map', async (req, res) => {
    res.render('map');
});

module.exports = router;