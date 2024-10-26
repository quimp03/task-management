const express = require("express")
const controller = require("../../controllers/user.controller")
const router = express()
router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/password/fogot", controller.fogot)
router.post("/password/otp", controller.otp)
router.post("/password/reset",  controller.reset)
module.exports = router