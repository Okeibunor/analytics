const router = require('express').Router();
const apiHandler = require('./api')

const welcomeMessage = {
    status: true,
    message: "welcome to financial analytics api"
}
exports.welcomeMessage = welcomeMessage

router.get('/', (req, res) => {
    res.json(welcomeMessage)
})
router.use('/api/v1/', apiHandler);

module.exports = router;
