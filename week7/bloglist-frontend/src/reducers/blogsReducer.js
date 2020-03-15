import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      const id = action.data.id
      return state.map(blog =>
        blog.id !== id ? blog : action.data
      )
    case 'REMOVE_BLOG':
      const removedBlogId = action.data
      return state.filter(blog =>
        blog.id !== removedBlogId
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return dispatch => {
    dispatch({
      type: 'CREATE_BLOG',
      data: blogObject,
    })
  }
}

export const updateBlog = (blogObject) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_BLOG',
      data: blogObject,
    })
  }
}

export const removeBlog = (id) => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

export default blogsReducer