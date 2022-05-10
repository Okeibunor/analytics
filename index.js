const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT


const routes = require('./src/routes/index')

app.use('/', routes)

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})