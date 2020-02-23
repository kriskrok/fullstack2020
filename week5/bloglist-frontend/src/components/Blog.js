import React, {useState} from 'react'

const Blog = ({ blog, updateBlog }) => {
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

  if (displayAll) {
    return (
      <div style={blogStyle}>
      {blog.title} by <i>{blog.author}</i><button onClick={() => toggleShowAll()}>close</button><br />
      {blog.url}<br />
      likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button><br />
      {blog.user.name}
    </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} by <i>{blog.author}</i><button onClick={() => toggleShowAll()}>view</button>
    </div>
  )
}

export default Blog