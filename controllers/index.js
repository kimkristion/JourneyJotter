const router = require('express').Router();

// const apiRoutes = require('./api/userRoutes');
const renderRoutes = require('./renderRoutes');

router.use('/', renderRoutes);
// router.use('/api', apiRoutes);

module.exports = router;