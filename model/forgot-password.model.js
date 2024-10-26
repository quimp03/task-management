const mongoose = require("mongoose")
const forgotPasswordSchemal = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 0
    }
},{
    timestamps: true
})
const forgotPassword = mongoose.model("forgotPassword", forgotPasswordSchemal, "forgot")
module.exports = forgotPassword