const mongoose = require("mongoose")
module.exports.connect = async(req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database successfully!")
    } catch (error) {
        console.log("Erorr connect to database!")
        console.log(error)
    }
}