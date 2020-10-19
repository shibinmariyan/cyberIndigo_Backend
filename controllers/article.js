const {
    ObjectID
} = require("bson");


const articleModel = require("../collections/articleModel");
const {
    errors,
    errorSend,
    responseSend
} = require("../config/util");
const {
    isExist,
    getArticleByUserId,
    getArticleById,
    deleteArticleById,
    getArticleByUserIdAndTag,
} = require("./getCollections");

const article_Create = async(req, res, next) => {
    try {
        if (
            errors.includes(req.body.title) ||
            errors.includes(req.body.subTitle) ||
            errors.includes(req.body.tags) ||
            req.body.tags.length < 1 ||
            errors.includes(req.body.description)
        )
            throw {
                code: 400,
                msg: `Bad Request`
            }
        const verify = await isExist({
            title: req.body.title,
            subTitle: req.body.subTitle
        })
        if (!errors.includes(verify))
            throw {
                code: 409,
                msg: verify
            }
        new articleModel({
                title: req.body.title,
                subTitle: req.body.subTitle,
                tags: req.body.tags,
                description: req.body.description,
                createdBy: req.userId
            }).save().then(succ => {
                if (errors.includes(succ))
                    throw {
                        code: 302,
                        msg: `Creation Failed`
                    }
                responseSend(res, 200, {
                    message: `Successfully Created`
                })
                next()
            })
            .catch(err => errorSend(res, err))
    } catch (error) {
        errorSend(res, error)
    }
}

const article_Update = async(req, res, next) => {
    try {
        if (
            errors.includes(req.body.title) ||
            errors.includes(req.body._id) ||
            errors.includes(req.body.subTitle) ||
            errors.includes(req.body.tags) ||
            req.body.tags.length < 1 ||
            errors.includes(req.body.description)
        )
            throw {
                code: 400,
                msg: `Bad Request`
            }
        const prev = await getArticleById(req.body._id);
        if (errors.includes(prev))
            throw {
                code: 404,
                msg: `No Data Found`
            }
        articleModel.updateOne({
                _id: ObjectID(req.body._id),
                createdBy: ObjectID(req.userId)
            }, {
                $set: {
                    title: req.body.title != prev.title ? req.body.title : prev.title,
                    subTitle: req.body.subTitle != prev.subTitle ? req.body.subTitle : prev.subTitle,
                    description: req.body.description != prev.description ? req.body.description : prev.description,
                    tags: prev.tags.filter(b => (req.body.tags.includes(b))),
                    updatedDate: new Date()
                }
            }).then(succ => {
                if (succ.nModified == 0)
                    throw {
                        code: 302,
                        msg: `Updation Failed`
                    }
                responseSend(res, 200, {
                    message: `Successfully Updated`
                })
                next()
            })
            .catch(err => errorSend(res, err))
    } catch (error) {
        errorSend(res, error)
    }
}
const article_getAll = async(req, res, next) => {
    getArticleByUserId(req.userId, null)
        .then(data => {
            if (errors.includes(data) || data.length < 1)
                throw {
                    code: 404,
                    msg: `No Data Found`
                }
            responseSend(res, 200, data)
            next()
        })
        .catch(err => errorSend(res, err))
}
const article_getById = async(req, res, next) => {
    try {
        if (errors.includes(req.query) || errors.includes(req.query.id))
            throw {
                code: 400,
                msg: `Bad Request`
            }
        console.log('got called', req.query);
        getArticleById(req.query.id)
            .then(data => {
                if (errors.includes(data))
                    throw {
                        code: 404,
                        msg: `No Data Found`
                    }
                responseSend(res, 200, data)
                next()
            })
            .catch(err => errorSend(res, err))
    } catch (error) {
        errorSend(res, error)
    }
}
const article_Delete = async(req, res, next) => {
    try {
        if (errors.includes(req.query) || errors.includes(req.query.id))
            throw {
                code: 400,
                msg: `Bad Request`
            }
        deleteArticleById(req.query.id).then(succ => {

            if (succ.deletedCount < 1)
                throw {
                    code: 302,
                    msg: `Deletion Failed`
                }
            responseSend(res, 200, `Deleted Successfully`)
            next()
        })
    } catch (error) {
        errorSend(res, error)
    }
}
const article_searchByTag = (req, res, next) => {
    try {
        if (errors.includes(req.query) || errors.includes(req.query.tag))
            throw {
                code: 400,
                msg: `Bad Request`
            }
        getArticleByUserIdAndTag(req.query.tag, req.userId)
            .then(data => {
                if (errors.includes(data))
                    throw {
                        code: 404,
                        msg: `No Data Found`
                    }
                responseSend(res, 200, data)
                next()
            })
            .catch(err => errorSend(res, err))
    } catch (error) {
        errorSend(res, error)
    }
}
module.exports = {
    article_Create,
    article_Update,
    article_getAll,
    article_getById,
    article_Delete,
    article_searchByTag
}