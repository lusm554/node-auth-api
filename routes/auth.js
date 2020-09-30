const Router = require('express').Router()

Router.post('/auth', (req, res) => {
  res.send('1')
})

exports.Router = Router