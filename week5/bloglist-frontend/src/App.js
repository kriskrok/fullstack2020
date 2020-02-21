import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

   /*useEffect(() => {
     (async function getBlogs() {
       const plokit = await blogService.getAll()
       console.log('hei äiti: ', typeof plokit, plokit)
       setBlogs(plokit)
     }) ()
    }, [])*/

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login ({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(`Invalid credentials, do give it a second spin`)
        setTimeout(() => {setNotification(null)}, 10000)
    }
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    try {
      const postedBlog = await blogService.create ({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })
      
      setNotification(`brand spanking new blog ${postedBlog.title} by ${postedBlog.author} added, rejoice!`)
        setTimeout(() => {setNotification(null)}, 10000)
    } catch (exception) {
      setNotification(`There has been an ${exception}`)
        setTimeout(() => {setNotification(null)}, 10000)
    }
    setNewBlog({ ...newBlog, title: '', author: '', url: '' })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username 
        <input type="text" value={username} name="Username" autoComplete="Username"
        onChange={({ target }) => (setUsername(target.value) )} />
      </div>
      <div>
        password 
        <input type="password" value={password} name="Password"
        onChange={({ target }) => ( setPassword(target.value) )}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const submitForm = () => (
    <form onSubmit={handleBlogPost}>
      <div>
        <label htmlFor="title">
          title:
          <input type="text" value={newBlog.title} name="title"
          onChange={({ target }) => (setNewBlog({ ...newBlog, title: target.value }))} />
        </label>
      </div>
      <div>
        <label htmlFor="author">
          author:
          <input type="text" value={newBlog.author} name="author"
          onChange={({ target }) => (setNewBlog({ ...newBlog, author: target.value }))} />
        </label>
      </div>
      <div>
        <label htmlFor="url">
          url:
          <input type="text" value={newBlog.url} name="url" spellCheck="false"
          onChange={({ target }) => (setNewBlog({ ...newBlog, url: target.value }))} />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  if (!user) {
    return (
      <div>
          <h2>Kindly log in to continue</h2>
          <Notification message={notification} />
          {loginForm()}
        </div>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>
        <p>
          logged in as {user.name}
          <Button onClick={handleLogout} text={'logout'} />
        </p>
      </div>
      <div>
        <h2>create new</h2>
        {submitForm()}
      </div>
      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default App