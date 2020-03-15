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

const update = async (id, blogObject) => {
  console.log('update metodi blogs palvelusta')
  const request = await axios.put(`${baseUrl}/${id}`, blogObject)
  return request.data
}

const remove = async (blogId) => {
  console.log('remove metodi blogs palvelusta', token, blogId)
  const request = await axios.delete(`${baseUrl}/${blogId}`, { headers: { Authorization: token } })
  return request.data
}

export default { getAll, create, update, remove, setToken }
