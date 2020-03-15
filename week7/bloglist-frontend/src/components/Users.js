import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)

  const renderUsers = () => {
    return (
      users.map( (each) => {
        const { id, name, blogs } = each
        return (
          <tr key={id}>
            <td>
              <Link to={`/users/${id}`}>{name}</Link>
            </td>
            <td>{blogs.length}</td>
          </tr>
        )
      })
    )
  }

  if (!users) return null

  return (
    <>
      <table className='table table-hover'>
        <thead className='thead-dark'>
          <tr>
            <th scope="col">User</th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
            {renderUsers()}
        </tbody>
      </table>
    </>
  )
}

export default Users