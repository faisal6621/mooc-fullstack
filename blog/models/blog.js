const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogSchema = mongoose.Schema({
  title: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id // eslint-disable-line no-param-reassign
    delete returnedObject.__v // eslint-disable-line no-param-reassign
  },
})

module.exports = mongoose.model('Blog', blogSchema)
