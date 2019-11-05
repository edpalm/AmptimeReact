const User = require('../models/UserSchema')

const loginController = {}

loginController.login = async (req, res) => {
  await User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      console.log(err)
      // flash message, "login failed"
    } else {
      user.comparePassword(req.body.password, (err, isMatching) => {
        if (err) {
          console.log(err)
          // flash message, "login failed"
        } else if (isMatching) {
          req.session.userId = user._id
        }
        res.redirect('/')
      })
    }
  })
}

loginController.register = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  await user.save((err, user) => {
    if (err) {
      console.log(err)
      // flash message, "user already exists"
    } else {
      // flash message, "user registered successfully"
    }
  })
  res.redirect('/')
}

loginController.userIsLoggedIn = (req, res) => {
  let data = {}
  if (req.session.userId) {
    data.isLoggedIn = true
  } else {
    data.isLoggedIn = false
  }
  res.json(data)
}

loginController.logout = async (req, res) => {
  await req.session.destroy((err) => {
    if (err) {
      console.log(err)
    } else {
      return res.redirect('/')
    }
  })
}

module.exports = loginController
