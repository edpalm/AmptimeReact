'use strict'

let mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Hash before saving.
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, saltRounds, function (err, hash) {
    if (err) {
      return next(err)
    }
    this.password = hash
    next()
  }.bind(this))
})

userSchema.methods.comparePassword = function (enteredPassword, callback) {
  bcrypt.compare(enteredPassword, this.password, (err, result) => {
    if (err) {
      return callback(err)
    }
    callback(null, result)
  })
}

let User = mongoose.model('User', userSchema)

// Exports.
module.exports = User
