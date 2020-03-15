import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ loggedUser, updateBlog, removeBlog }) => {
  const blogs = useSelector(state => state.blogs)
    .sort( (a,b) => b.likes - a.likes || b.id.length - a.id.length)


  console.log('käyttäjä:',  loggedUser)
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}
          removeBlog={removeBlog} loggedUser={loggedUser}/>
      )}
    </div>
  )
  
}

export default BlogList