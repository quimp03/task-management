const taskRoutes = require("./task.route")
module.exports = (app) =>{
    const verson = "/api/v1"
    app.use(verson + "/tasks", taskRoutes)
}