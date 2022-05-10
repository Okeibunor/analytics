const router = require('express').Router();
const { getAllTransactions, getSingleTransaction } = require('../../controllers/VfdController');

router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getSingleTransaction);

module.exports = router;
