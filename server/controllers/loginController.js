
const loginController = {}

loginController.login = (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)

  // find in db
  // set in session

  res.redirect('/')
}

loginController.register = (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)

  // already exists? , flash message
  // doesn't exist?, validate and create
  // flash message showing it worked!.

  res.redirect('/')
}

module.exports = loginController
