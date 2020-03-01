const dummy = (blogs) => {
  // some code to be added later using blogs
  console.log(blogs.length)
  return 1
}

const totalLikes = (blogs) => blogs.map((blog) => blog.likes)
  .reduce((sum, likes) => sum + likes, 0)


module.exports = { dummy, totalLikes }
