import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

const SingleBlog = ({ updateBlog, removeBlog, user }) => {
  const blogs = useSelector(state => state.blogs)
  const history = useHistory()
  const id = useParams().id

  if (!blogs) return null

  const blog = blogs.find(blog => blog.id === id)

  const likeBlog = () => {
    updateBlog(blog.id,
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      })
  }

  const confirmRemove = () => {
    const result = window.confirm(`Oh dear, are you quite sure you wish to remove blog ${blog.name} by ${blog.author}?`)
    if (result) {
      removeBlog(blog)
      history.push('/')
    }
  }

  return (
    <>
      <h4>{blog.title} {blog.author}</h4>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item list-group-item-action'><a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a></li>
        <li className='list-group-item list-group-item-action'>likes {blog.likes} <button onClick={() => likeBlog()}>like</button></li>
        <li className='list-group-item list-group-item-action'>added by {blog.user.name}</li>
      </ul>
      <div style={{ margin: '1em'}}>
        {user.username === blog.user.username
              ? <button onClick={() => confirmRemove()} className='btn btn-dark'>remove</button>
              : null}
      </div>
    </>
  )
}

export default SingleBlog
