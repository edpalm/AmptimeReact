require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const mongoose = require('../config/mongoose.js')
const port = 8080
const loginRouter = require('./routes/loginRouter')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const app = express()

// Setup session store
const store = new MongoDBStore({
  uri: process.env.STORE_URI,
  databaseName: process.env.STORE_DBNAME,
  collection: process.env.STORE_COLLECTION
},
(err) => {
  if (err) {
    console.log(err)
  }
})

store.on('error', (err) => {
  console.log(err)
})

// Connect to dB
mongoose()

// allow json and forms
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.session_SECRET,
  resave: false, // *check if store sets expiration date.
  saveUninitialized: false,
  cookie: {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production'
  },
  store: store
}))

// Allow dev proxy requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.static(path.join(__dirname, '../build')))

app.use('/', loginRouter)

app.listen(port)
