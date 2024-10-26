const User = require("../model/user.model")
const fogotPassword = require("../model/forgot-password.model")
const generateHelper = require("../helper/generate.helper")
const sendEmailHelper = require("../helper/sendEmail.helper")
const md5 = require("md5")
const forgotPassword = require("../model/forgot-password.model")
module.exports.register = async(req, res) => {
    const exitEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if(exitEmail){
        res.status(400).json({
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
        res.status(400).json({
            code: 400,
            message: "Email không tồn tại!"
        })
        return
    }
    if(exitEmail.password !== password){
        res.status(400).json({
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
module.exports.fogot = async(req, res) => {
    const email = req.body.email
    const exitEmail = await User.findOne({
        email: email,
        deleted: false
    })
    if(!exitEmail){
        res.status(400).json({
            code: 400,
            message: "Email không tồn tại!"
        })
        return
    }
    const otp = generateHelper.generateRandomNumber(6)
    const objectFogotPassword = {
        email : email,
        otp: otp,
        expireAt: Date.now() + 3*60*1000,
    }
    const fogotPassword = new forgotPassword(objectFogotPassword)
    await fogotPassword.save()
    // gui otp qua mail
    const subject = "Lấy lại mật khẩu."
    const text = `Mã xác thực OTP: ${otp}. Vui lòng không cung cấp mã OTP này với bất kỳ ai!`
    sendEmailHelper.sendEmail(email,subject,text)
    res.json({
        code: 200,
        message: "Đã gởi mã otp qua mail",
        email,
    })
}
module.exports.otp = async(req, res) => {
    const email = req.body.email
    const otp = req.body.otp
    const exitOtp = await fogotPassword.findOne({
        email: email,
        otp: otp
    })
    if(!exitOtp){
        res.status(400).json({
            code: 400,
            message: "Mã otp không hợp lệ!"
        })
        return
    }
    const user  = await User.findOne({
        email: email,
        deleted: false
    })
    const token = user.token
    res.status(200).json({
        code: 200,
        message: "Xác thực thành công!",
        token
    })
}
module.exports.reset = async(req, res) => {
    const token = req.body.token
    const password = req.body.password
    const exitUser = await User.findOne({
        token: token,
        deleted: false
    })
    if(!exitUser){
        res.status(400).json({
            message: "Người dùng không tồn tại!"
        })
        return
    }
    const user = await User.updateOne({
        token: token,
        deleted: false
    }, {
        password: md5(password)
    })
    res.status(200).json({
        code: 200,
        message: "Cập nhật mật khẩu thành công!"
    })
    res.send("Ok")
}