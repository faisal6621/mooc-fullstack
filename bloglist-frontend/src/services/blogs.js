import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUsersBlogs = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  console.log('response data:', response.data)
  return response.data
}

export default { getAll, getUsersBlogs, setToken }
