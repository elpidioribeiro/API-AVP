const express = require('express');
const { registerUser, loginUser, logAcess } = require('../controllers/users');
const { verifyValidEmail, emailExists } = require('../middlewares/validateRequests');


const router = express();

router.post('/user', verifyValidEmail, emailExists, registerUser);
router.post('/login',loginUser);
router.post('/logAcess', logAcess);
module.exports = router;