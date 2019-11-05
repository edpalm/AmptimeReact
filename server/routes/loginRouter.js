
const router = require('express').Router()
const loginController = require('../controllers/loginController')

router.route('/login')
  .post(loginController.login)

router.route('/register')
  .post(loginController.register)

router.route('/userLoggedInStatus')
  .get(loginController.userIsLoggedIn)

router.route('/logout')
  .post(loginController.logout)

module.exports = router
