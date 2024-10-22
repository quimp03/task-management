const express = require("express")
const controller = require("../../controllers/user.controller")
const router = express()
router.post("/register", controller.register)
router.post("/login", controller.login)
module.exports = router