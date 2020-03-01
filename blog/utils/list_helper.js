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

module.exports = { dummy, totalLikes, favoriteBlog }
