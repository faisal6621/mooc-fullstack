const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: {
    type: String, required: true, unique: true, minlength: 3,
  },
  passwordHash: String,
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id // eslint-disable-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v // eslint-disable-line no-underscore-dangle, no-param-reassign
    delete returnedObject.passwordHash // eslint-disable-line no-param-reassign
  },
})

module.exports = mongoose.model('User', userSchema)
