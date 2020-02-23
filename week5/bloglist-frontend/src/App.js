import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import SubmitForm from './components/SubmitForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( sortBlogsByLikes(blogs) )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const sortBlogsByLikes = blogs => blogs.sort( (a,b) => b.likes - a.likes )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login (userObject)

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification(`Invalid credentials, do give it a second spin`)
        setTimeout(() => {setNotification(null)}, 10000)
    }
  }

  const addNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const postedBlog = await blogService.create (blogObject)

      setBlogs(blogs.concat(postedBlog))
      setNotification(`brand spanking new blog ${postedBlog.title} by ${postedBlog.author} added, rejoice!`)
        setTimeout(() => {setNotification(null)}, 10000)
    } catch (exception) {
      setNotification(`There has been an ${exception}`)
        setTimeout(() => {setNotification(null)}, 10000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (exception) {
      setNotification(`There has been an ${exception}`)
        setTimeout(() => {setNotification(null)}, 10000)
    }
  }

  const submitForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <SubmitForm createBlog={addNewBlog} />
    </Togglable>
  )

  if (!user) {
    return (
      <div>
        <h2>Kindly log in to continue</h2>
        <Notification message={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <div>
        <p>
          logged in as {user.name}
          <Button onClick={handleLogout} buttonLabel='logout' />
        </p>
      </div>
      <Notification message={notification} />
      {submitForm()}
      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        )}
      </div>
    </>
  )
}

export default App