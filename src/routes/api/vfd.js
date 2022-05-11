const router = require('express').Router();
const { getAllTransactions, getSingleTransaction } = require('../../controllers/vfd.controller');
const { verifyToken } = require('../../middleware/authJwt');

router.use((req, res, next) => verifyToken(req,res,next))

router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getSingleTransaction);

module.exports = router;
