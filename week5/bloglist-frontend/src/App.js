import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
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

  if (user === null) {
    return (
      <div>
          <h2>Kindly log in to continue</h2>
          {loginForm()}
        </div>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <div>
        <p>
          logged in as {user.name}
          <Button onClick={handleLogout} text={'logout'} />
        </p>
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