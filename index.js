const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('express')();

// Connect database
if(process.env.NODE_ENV) {
  require('./db/mongoose_config')
} else {
  require('./db/mongoose')
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/** 
 * TODO: 
 * Make a simple registration 
 * Implement authorization using JWT
 */

// Import routes
const {Router: AuthRoutes} = require('./routes/auth')
const {Router: Signup} = require('./routes/signup')
app.use('/api/users', AuthRoutes)
app.use('/api/users', Signup)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8080)