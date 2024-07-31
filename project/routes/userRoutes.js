const express = require('express');
const userController = require('../controllers/userController');
const { validateRequest } = require('../middleware/validateRequest');
const router = express.Router();

router.post('/register', validateRequest, userController.userRegister);
router.get('/getUser/:id', userController.getUserById);
router.put('/updateUser/:id', validateRequest, userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);

module.exports = router;
