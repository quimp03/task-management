const User = require("../model/user.model")
module.exports.requireAuth = async(req, res, next) => {
    
    if(!req.headers.authorization){
        res.json({
            code: 400,
            message: "Vui lòng gởi lên token"
        })
        return
    }
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
        token: token,
        deleted: false
    }).select("fullName email")
    if(!user){
        res.json({
            code: 400,
            message: "Người dùng không tồn tại!"
        })
        return
    }
    res.locals.user = user
    next()
}