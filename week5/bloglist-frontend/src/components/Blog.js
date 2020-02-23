import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, loggedUser }) => {
  const [displayAll, setdisplayAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowAll = () => setdisplayAll(!displayAll)

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
    }
  }

  if (displayAll) {
    return (
      <div style={blogStyle}>
        {blog.title} by <i>{blog.author}</i><button onClick={() => toggleShowAll()}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes} <button onClick={() => likeBlog()}>like</button><br />
        {blog.user.name}<br />
        {loggedUser === blog.user.username
          ? <button onClick={() => confirmRemove()}>remove</button>
          : null}
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} by <i>{blog.author}</i><button onClick={() => toggleShowAll()}>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func,
  removeBlog:PropTypes.func,
  loggedUser: PropTypes.string
}

export default Blog