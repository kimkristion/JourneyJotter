const router = require('express').Router();

router.get('/logs', (req, res) =>{
    res.render('logpage');
});

module.exports = router;