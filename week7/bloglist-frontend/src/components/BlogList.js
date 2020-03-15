import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
    .sort( (a,b) => b.likes - a.likes || b.id.length - a.id.length)

  return (
    <div>
      {blogs.map(blog => 
        <div key={blog.id}>
          <Blog blog={blog} />
        </div>
      )}
    </div>
  )
}

export default BlogList
