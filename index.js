const express = require("express")
const env = require("dotenv")
const bodyParser = require('body-parser')
const cors  = require("cors")
env.config()
const database = require("./config/database")
const routeApiV1 = require("./v1/routes/index.route")

const app = express()
app.use(cors());
app.use(bodyParser.json())
routeApiV1(app)
database.connect()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})