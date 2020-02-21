import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  newToken === null
    ? token = null
    : token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const postedBlog = await axios.post(baseUrl, blog, config)
  return postedBlog.data
}

export default { getAll, create, setToken }