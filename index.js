const cors = require('cors')
const bodyParser = require('body-parser')

// Connect database
if (process.env.NODE_ENV) {
  require('./db/mongoose_config')
} else {
  require('./db/mongoose')
}

const app = require('express')();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import routes
const { Router: AuthRoutes } = require('./routes/auth')
const { Router: Signup } = require('./routes/signup')
app.use('/api/users', AuthRoutes)
app.use('/api/users', Signup)


/* ⬇️ not completed ⬇️ */ 
const path = require('path')

// To test file upload
app.get('/loadfile', (req, res) => {
  res.sendFile(path.resolve('loadfile.html'))
})

app.get('/getfile/:id', (req, res) => {
  const { id } = req.params
  res.json({id})
})

app.post('/loadfile', (req, res) => {
  res.json(req.body)
})

app.listen(8080)