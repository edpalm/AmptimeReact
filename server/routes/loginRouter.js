
const router = require('express').Router()
const loginController = require('../controllers/loginController')

router.route('/testproxy')
  .post(loginController.ping)

module.exports = router
