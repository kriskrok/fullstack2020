import React from 'react'

const Blog = ({ blog }) => (
  <p>{blog.title} by <i>{blog.author}</i></p>
)

export default Blog