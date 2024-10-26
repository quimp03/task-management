const taskRoutes = require("./task.route")
const userRoutes = require("./user.route")
const authMiddleware = require("../../middleware/auth.middleware")
module.exports = (app) =>{
    const verson = "/api/v1"
    app.use(verson + "/tasks",authMiddleware.requireAuth, taskRoutes)
    app.use(verson + "/users", userRoutes)
}