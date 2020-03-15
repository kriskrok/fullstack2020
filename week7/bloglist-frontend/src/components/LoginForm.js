import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('rölli')
  const [password, setPassword] = useState('likaiset_varpaat')

  const userLogin = (event) => {
    event.preventDefault()
    handleLogin({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={userLogin} style={{ margin: 'auto', maxWidth: '50%'}}>

      <div className='form-group row'>
        <label htmlFor='username' className='col-sm-3 col-form-label'>
          Username
        </label>
        <div className='col-sm-9'>
        <input type="text" value={username} className='form-control' name="Username"
          onChange={({ target }) => (setUsername(target.value) )} />
          <small id='usernameHelp' className='form-text text-muted'>this be a required field</small>
        </div>
      </div>


      <div className='form-group row'>
        <label htmlFor='username' className='col-sm-3 col-form-label'>
          password
        </label>
        <div className='col-sm-9'>
        <input type="password" value={password} className='form-control' name="Password"
          onChange={({ target }) => ( setPassword(target.value) )} />
          <small id='passwordHelp' className='form-text text-muted'>alas, this aswell mate</small>
        </div>
      </div>
      <button type='submit' className='btn btn-info'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm