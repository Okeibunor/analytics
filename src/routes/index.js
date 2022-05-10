const router = require('express').Router();

const apiHandler = require('./api')

router.use('/api/v1/', apiHandler);

module.exports = router;
