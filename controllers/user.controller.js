const User = require("../model/user.model")
const generateHelper = require("../helper/generate.helper")
const md5 = require("md5")
module.exports.register = async(req, res) => {
    const exitEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if(exitEmail){
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
        return
    }
    const data = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token: generateHelper.generateRandomString(30)
    }
    const user = new User(data)
    await user.save()
    const token = user.token
    res.json({
        token,
        code: 200,
        message: "Đăng kí tài khoản thành công!",
    })
}
module.exports.login = async(req, res) => {
    const email = req.body.email
    const password = md5(req.body.password)
    const exitEmail = await User.findOne({
        email: email,
        deleted: false
    })
    if(!exitEmail){
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        })
        return
    }
    if(exitEmail.password !== password){
        res.json({
            code: 400,
            message: "Sai mật khẩu"
        })
        return
    }
    const token = exitEmail.token 
    res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token,
    })
}