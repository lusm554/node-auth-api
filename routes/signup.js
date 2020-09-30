const Router = new require('express').Router()
const { User } = require('../modelsDB/user')
const jwt = require('jsonwebtoken')

Router.post('/signup', async (req, res) => {
  const {name, password} = req.body
  const user = new User({ name, password, tokens: [] })

  // Add token
  const token = jwt.sign({ id: user.id }, 'super_secret_key')
  user.tokens = user.tokens.concat({token})

  await user.save((err, doc) => {
    if(err) {
      res.status(500).send('Internal server error')
      console.error(err)
      return
    }
    res.json(doc)
  })
})

exports.Router = Router