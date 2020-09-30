const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('express')();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import routes
const {Router: AuthRoutes} = require('./routes/auth')
const {Router: Signup} = require('./routes/signup')
app.use('/api/users', AuthRoutes)
app.use('/api/users', Signup)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8080)