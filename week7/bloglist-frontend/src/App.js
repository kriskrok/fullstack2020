import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css'

import User from './components/User'
import Users from './components/Users'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import SingleBlog from './components/SingleBlog'
import SubmitForm from './components/SubmitForm'
import Notification from './components/Notification'
import { setUser, expelUser } from './reducers/userReducer'
import { setUsers, abolishUsers } from './reducers/usersReducer'
import { setNotification as setNote } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog as refreshBlog, removeBlog as eraseBlog, createBlog as newBlog } from './reducers/blogsReducer'


const App = () => {
  const history = useHistory()
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
    dispatch(abolishUsers())
    history.push('/')
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      const users = await userService.getAll()

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsers(users))
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
    <Togglable buttonLabel='create new' ref={blogFormRef}>
      <SubmitForm createBlog={addNewBlog} />
    </Togglable>
  )

  if (!user) {
    return (
      <div className='container App'>
        <h2 style={{ textAlign: 'center'}}>Kindly log in to continue</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className='container App'>
    <Navbar user={user} handleLogout={handleLogout} />
    
    <h1 className='text-center display-4'>blog app</h1>
    <Notification />

    <Switch>
      <Route path='/blogs/:id'>
        <SingleBlog updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
      </Route>
      <Route path='/users/:id'>
        <User />
      </Route>
      <Route exact path='/users'>
        <Users />
      </Route>
      <Route exact path='/'>
        {submitForm()}
        <BlogList loggedUser={user.username} updateBlog={updateBlog} removeBlog={removeBlog}/>
      </Route>
    </Switch>
    </div>
  )
}

export default App
