const express = require("express")
const env = require("dotenv")
env.config()
const mongoose = require("mongoose")
const database = require("./config/database")
const Task = require("./model/task.model")
const app = express()
database.connect()
const port = process.env.PORT

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find({
        deleted: false
    })
    console.log(tasks)
    res.send("OK")
})
app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})