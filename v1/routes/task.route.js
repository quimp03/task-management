const express = require("express")
const Task = require("../../model/task.model")
const controller = require("../../controllers/task.controller")
const router = express()
router.get("/", controller.index)
router.get("/detail/:id", controller.detail)
module.exports = router