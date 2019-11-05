'use strict'
// Requires.
require('dotenv').config({path: '../.env'})
const mongoose = require('mongoose')

// Database connectionstring
let connectionString = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@ds${process.env.DB_NUMBER}.mlab.com:${process.env.DB_PORT}/${process.env.DB_NAME}`

// disable deprecated method.
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = () => {
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

  mongoose.connection.on('connected', function () {
    console.log('Mongoose connection opened.')
  })

  mongoose.connection.on('error', function (error) {
    console.error('Mongoose connection error: ', error)
  })

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected')
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination')
      process.exit(0)
    })
  })
}
