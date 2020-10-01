const Router = require('express').Router()
const jwt = require('jsonwebtoken')
const { User } = require('../modelsDB/user')

async function auth(req, res, next) {
  const token = req.header('Authorization').replace('Bearer', '').trim()
  let decoded;

  try {
    decoded = jwt.verify(token, "super_secret_key")
  } catch (error) {
    res.status(400).send('BAD REQUEST')
    return
  }

  User.findById(decoded.id, (err, doc) => {
    if (err) {
      res.status(401).send('UNAUTHORIZED')
      return
    }

    req.user = doc
    next()
  })
}

Router.post('/auth', auth, (req, res) => {
  res.json(req.user)
})

exports.Router = Router