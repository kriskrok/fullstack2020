import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [displayAll, setdisplayAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowAll = () => setdisplayAll(!displayAll)

  if (displayAll) {
    return (
      <div style={blogStyle}>
      {blog.title} by <i>{blog.author}</i><button onClick={() => toggleShowAll()}>close</button><br />
      {blog.url}<br />
      likes {blog.likes} <button>like</button><br />
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