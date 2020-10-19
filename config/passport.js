const { errors, secretCode } = require('./util');
var jwt = require('jsonwebtoken');
const {
    isUser
} = require('../controllers/getCollections');
module.exports = (req, res, next) => {
    const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : null;
    if (errors.includes(token)) {
        return res.status(401).json({
            message: "Unauthorized Access!"
        });
    }
    jwt.verify(token, secretCode, async(err, decoded) => {
        try {
            if (err) {
                throw {
                    err
                }
            }
            const verify = await isUser(decoded._id)
            if (errors.includes(verify))
                throw 'err'
            req.userId = decoded._id;
            next();
        } catch (error) {
            res.status(401).json({
                message: "Unauthorized Access!"
            })
        }
    });
}