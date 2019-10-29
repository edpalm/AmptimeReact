
const loginController = {}

// testing proxy.
loginController.ping = (req, res) => {
  console.log(req)
  let data = {
    message: 'ping'
  }
  res.json(data)
}

module.exports = loginController
