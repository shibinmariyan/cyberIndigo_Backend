const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretCode = 'OG-.PyQprt~9RHiioefXBsFwR'

const errors = ['', undefined, NaN, null];


const errorSend = async(res, err) => {
    console.log(err)
    responseSend(
        res, err.code ? err.code : 500, {
            message: err.msg ? err.msg : err.message ? err.message : `Oops Something went wrong`
        });
}
const responseSend = (res, statusCode, message) => {
    res.status(statusCode)
        .json(
            message
        )
}
const encryptPassword = async(pwd) => {
    return await bcrypt.hash(pwd, 8)
}
const generateToken = (jwtpayload) => {
    return jwt.sign(jwtpayload, secretCode, {
        expiresIn: 86400,
        algorithm: "HS256"
    });
}




module.exports = {
    errors,
    secretCode,
    errorSend,
    responseSend,
    encryptPassword,
    generateToken
}