const {
    ObjectID
} = require("bson");
const articleModel = require("../collections/articleModel");
const userModel = require("../collections/userModel");
const {
    errors,
} = require("../config/util");
const validator = require('email-validator');
const isExist = async(keyword, flag) => {
    console.log('isExist', keyword, flag)
    if (flag)
        return await getUser(keyword) ? `Email already exist!` : !validator.validate(keyword) ? `Invalid Email Entry` : null
    else
        return await getArticle(keyword) ? `Already an article exist with this title and subTitle.` : null
}
const isUser = async(id) => {

    return await userModel.findOne({
        _id: ObjectID(id)
    }, {
        _id: 1
    }) ? true : false
}
const getUser = (keyword) => {
    return userModel.findOne({
        email: keyword
    })
}

const getArticle = (keyword) => {
    return articleModel.findOne({
        title: keyword.title,
        subTitle: keyword.subTitle
    })
}
const getArticleById = (id) => {
    return articleModel.findOne({
        _id: ObjectID(id)
    });
}
const getArticleByUserId = (id) => {
    return articleModel.find({
        createdBy: ObjectID(id)
    }, {
        title: 1,
        subTitle: 1,
        description: 1,
        tags: 1
    }).sort({
        createdDate: -1
    });
}
const getArticleByUserIdAndTag = (tag, id) => {
    return articleModel.find({
        createdBy: ObjectID(id),
        tags: tag
    }, {
        title: 1,
        subTitle: 1,
        description: 1,
        'tags.$': 1
    }).sort({
        createdDate: -1
    });
}
const deleteArticleById = (id) => {
    return articleModel.deleteOne({
        _id: ObjectID(id)
    });
}

module.exports = {
    isExist,
    isUser,
    getUser,
    getArticleById,
    getArticleByUserId,
    deleteArticleById,
    getArticleByUserIdAndTag
}