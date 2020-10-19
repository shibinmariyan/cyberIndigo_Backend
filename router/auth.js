const express = require('express');
const {
    userRegister,
    userLogin,
    refreshToken
} = require('../controllers/auth');
const router = new express.Router();


router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/refreshToken').post(refreshToken);


module.exports = router