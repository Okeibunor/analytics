const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3333
const node_env = process.env.NODE_ENV
require('dotenv').config()
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize.sync()

const routes = require('./src/routes/index')
app.use('/', routes)
app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})