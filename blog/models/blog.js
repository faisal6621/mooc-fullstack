const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id // eslint-disable-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v // eslint-disable-line no-underscore-dangle, no-param-reassign
  },
})

module.exports = mongoose.model('Blog', blogSchema)
