const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    checkPassword(value) {
      let options = { ignore_whitespace: true }
      if(validator.isEmpty(value, options)) {
        throw new Error('Enter you password!')
      } 
    },
  },
  tokens: [{
    token: {
      type: String,
      // required: true,
    },
  },],
}, { 
  timestamps: { 
    createdAt: 'created_at' 
  }
})

const User = mongoose.model('User', UserSchema)

exports.User = User
