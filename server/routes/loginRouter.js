
const router = require('express').Router()
const loginController = require('../controllers/loginController')

router.route('/login')
  .post(loginController.login)

router.route('/register')
  .post(loginController.register)

module.exports = router
