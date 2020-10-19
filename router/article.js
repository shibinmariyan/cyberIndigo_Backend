const express = require('express');
const router = new express.Router();
const {
    article_Create,
    article_Update,
    article_Delete,
    article_getAll,
    article_getById,
    article_searchByTag
} = require('./../controllers/article')
router.route('/create').post(article_Create);
router.route('/update').post(article_Update);
router.route('/delete').get(article_Delete);
router.route('/getAll').get(article_getAll);
router.route('/getById').get(article_getById);
router.route('/searchByTag').get(article_searchByTag);

module.exports = router