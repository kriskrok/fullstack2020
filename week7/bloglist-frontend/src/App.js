import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Button from './components/Button'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import SubmitForm from './components/SubmitForm'
import Notification from './components/Notification'
import { setUser, expelUser } from './reducers/userReducer'
import { setNotification as setNote } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog as refreshBlog, removeBlog as eraseBlog, createBlog as newBlog } from './reducers/blogsReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    dispatch(expelUser())
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNote('Invalid credentials, do give it a second spin'))
    }
  }

  const addNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const postedBlog = await blogService.create(blogObject)

      dispatch(newBlog(postedBlog))
      dispatch(setNote(`brand spanking new blog ${postedBlog.title} by ${postedBlog.author} added, rejoice!`))
    } catch (exception) {
      dispatch(setNote(`There has been an ${exception}`))
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      dispatch(refreshBlog(updatedBlog))
    } catch (exception) {
      dispatch(setNote(`There has been an ${exception}`))
    }
  }

  const removeBlog = async (blogToBeRemoved) => {
    try {
      await blogService.remove(blogToBeRemoved.id)
      dispatch(eraseBlog(blogToBeRemoved.id))
      dispatch(setNote(`Blog ${blogToBeRemoved.title} by ${blogToBeRemoved.author} was smited into oblivion.`))
    } catch (exception) {
      dispatch(setNote(`There has been an ${exception}`))
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
        <Notification />
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
      <Notification />
      {submitForm()}
      <BlogList loggedUser={user.username} updateBlog={updateBlog} removeBlog={removeBlog}/>
    </>
  )
}

export default App
