import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => (
  <nav className='navbar navbar-light bg-light'>

    <form className='form-inline navbar-text'>
    {<Link style={{padding: 5}} to="/">blogs</Link>}
    {<Link style={{padding: 5}} to="/users">users</Link>}

    {<>
        logged in as {user.name}&nbsp;
        <button type="button" style={{fontSize: '1em'}} className="btn btn-dark"
        onClick={() => handleLogout()}>
        logout</button>
    </>}
    </form>
  </nav>
)

export default Navbar
