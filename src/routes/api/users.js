const router = require('express').Router();
const authorize = require('../../middleware/authorize')
const { authenticateSchema, authenticate, register, registerSchema, getAll, getById, updateSchema, update, getCurrent, _delete } = require('../../controllers/UsersController')

router.post('/login', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;