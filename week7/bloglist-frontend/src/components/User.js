import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id

  if (!users) return null

  const user = users.filter(user => user.id === id)[0]

  const renderBlogs = () => {
    return (
        user.blogs.map( each => {
          return (
            <li key={each.id} className='list-group-item list-group-item-action'>{each.title}</li>
          )
        })
    )    
  }

  return (
    <>
      <h3 style={{textAlign: 'right'}}>{user.name}</h3>
      <h4 style={{textAlign: 'right'}}>Added blogs</h4>
      <ul className='list-group list-group-flush'>
        {renderBlogs()}
      </ul>
    </>
  )
}

export default User