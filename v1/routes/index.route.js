const taskRoutes = require("./task.route")
const userRoutes = require("./user.route")
module.exports = (app) =>{
    const verson = "/api/v1"
    app.use(verson + "/tasks", taskRoutes)
    app.use(verson + "/users", userRoutes)
}