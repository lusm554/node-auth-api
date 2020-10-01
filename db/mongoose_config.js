const mongoose = require('mongoose')

let token = 'mongodb+srv://username:<password>@todo-api.gnam7.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(token, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('database connected')
  })
  .catch((err) => {
    console.error(err)
  })

process.on('exit', () => {
  mongoose.connection.close()
})