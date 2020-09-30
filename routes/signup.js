const Router = new require('express').Router()

Router.post('/signup', (req, res) => {
  let body = req.body

  res.json({...body})
})

exports.Router = Router