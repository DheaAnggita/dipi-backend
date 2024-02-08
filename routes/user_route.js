const express = require('express');
const router = express.Router();
const { register, login, updateUser, getUserById, getUsers } = require('../controllers/user_controller');
const { uploadMiddleware } = require('../middlewares/uploader_middleware');
const { authenticateToken } = require('../middlewares/auth_middleware')

router.post('/register', register);
router.post('/login', login);
router.put('/', authenticateToken, uploadMiddleware, updateUser);
router.get('/:id', getUserById );
router.get('/', getUsers );

module.exports = router;
