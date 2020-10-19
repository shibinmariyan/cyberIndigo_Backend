const userModel = require("../collections/userModel")
const {
    errors,
    errorSend,
    responseSend,
    generateToken
} = require("../config/util")
const {
    isExist,
    getUser
} = require("./getCollections")


const userRegister = async(req, res) => {
    try {
        if (errors.includes(req.body.email) || errors.includes(req.body.password) || errors.includes(req.body.name))
            throw {
                code: 400,
                msg: `Data Missing`
            }
        const verify = await isExist({
            keyword: req.body.email,
            flag: null
        }, 'user')
        if (!errors.includes(verify))
            throw {
                code: 409,
                msg: verify
            }
        new userModel({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            }).save()
            .then(succ => responseSend(res, 200, {
                message: `Successfully Created`,
                userId: succ._id
            })).catch(err => errorSend(res, err))
    } catch (error) {
        errorSend(res, error)
    }
}

const userLogin = async(req, res) => {
    try {
        if (errors.includes(req.body.email) || errors.includes(req.body.password))
            throw {
                code: 400,
                msg: `Data Missing`
            }
        getUser(req.body.email)
            .then(succ => {
                if (errors.includes(succ))
                    throw {
                        code: 404,
                        msg: `No User Found`
                    }
                succ.comparePassword(req.body.password, (err, isMatch) => {
                    try {
                        if (err)
                            throw {
                                code: 500,
                                msg: "Oops Something went wrong"
                            }
                        if (!isMatch)
                            throw {
                                code: 401,
                                msg: "Wrong Password"
                            }
                        const jwtpayload = {
                            _id: succ._id,
                            name: succ.name
                        };
                        responseSend(res, 200, {
                            message: `Logged In Successfully`,
                            name: succ.name,
                            userId: succ._id,
                            AccessToken: generateToken(jwtpayload)
                        })
                    } catch (error) {
                        errorSend(res, error)
                    }
                })
            })
            .catch(err => errorSend(res, err))
    } catch (error) {
        errorSend(res, error)
    }
}

const refreshToken = async(req, res) => {

}

module.exports = {
    userRegister,
    userLogin,
    refreshToken
}