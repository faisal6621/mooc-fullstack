const _ = require('lodash')

const dummy = (blogs) => {
  // some code to be added later using blogs
  console.log('dummy blogs.length', blogs.length)
  return 1
}

const totalLikes = (blogs) => blogs.map((blog) => blog.likes)
  .reduce((sum, likes) => sum + likes, 0)

const favoriteBlog = (blogs) => {
  const favBlog = blogs.map((blog) => blog)
    .reduce((favorite, current) => (current.likes > favorite.likes ? current : favorite),
      { title: '', author: '', likes: 0 })
  return favBlog
}

const mostBlogs = (blogs) => {
  const groupedAuthors = _.groupBy(blogs, 'author')
  const transformed = _.transform(groupedAuthors,
    ((result, value, key) => result.push({ author: key, blogs: value.length })),
    [])
  return _.maxBy(transformed, 'blogs')
}

const mostLikes = (blogs) => {
  const groupedAuthors = _.groupBy(blogs, 'author')
  // console.log('grouped:', groupedAuthors)
  const transformed = _.transform(groupedAuthors,
    ((result, value, key) => result.push(
      {
        author: key,
        likes: _.reduce(value,
          ((aggr, curr) => ({ likes: (aggr.likes + curr.likes) })),
          { likes: 0 }).likes,
      },
    )),
    [])
  // console.log('transformed:', transformed)
  return _.maxBy(transformed, 'likes')
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}
