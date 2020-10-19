const express = require('express');
const { isExist } = require('../controllers/getCollections');
const router = new express.Router();

//test
router.get('/', (req, res) => {
    res.send('GET request to the homepage')
})
router.use('/auth', require('./../router/auth'));
router.use(require('./passport'));
router.use('/article', require('./../router/article'))

router.post('/test', async(req, res) => {

})


module.exports = router;