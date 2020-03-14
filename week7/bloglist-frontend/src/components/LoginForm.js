import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = (event) => {
    event.preventDefault()
    handleLogin({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={userLogin}>
      <div>
        <label htmlFor="username">
          username
          <input type="text" value={username} name="Username" autoComplete="Username"
            onChange={({ target }) => (setUsername(target.value) )} />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          password
          <input type="password" value={password} name="Password"
            onChange={({ target }) => ( setPassword(target.value) )} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm