import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getUsersBlogs = async () => {
  const response = await axios.get(baseUrl, getConfig())
  return response.data
}

const addNewBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig())
  return response.data
}

const updateBlogLikes = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes }, getConfig())
  return response.data
}

const getConfig = () => {
  const config = {
    headers: { Authorization: token }
  }
  return config
}
export default { getUsersBlogs, addNewBlog, updateBlogLikes, setToken }
