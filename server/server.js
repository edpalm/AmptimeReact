require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('../config/mongoose.js')
const port = 8080
const loginRouter = require('./routes/loginRouter')
const session = require('express-session')
// Connect to dB
mongoose()

// allow json and forms
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.session_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production'
  }
}))

// Allow dev proxy requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.static(path.join(__dirname, '../build')))

app.use('/', loginRouter)

app.listen(port)
