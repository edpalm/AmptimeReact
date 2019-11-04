const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()

const port = 8080

const loginRouter = require('./routes/loginRouter')

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
// Allow dev proxy requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.static(path.join(__dirname, '../build')))

app.use('/', loginRouter)

app.listen(port)
