const userReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return ''
    default:
      return state
  }
}

export const setUser = (user) => {
  // token, username, name
  return {
    type: 'SET_USER',
    data: user,
  }
}

export const expelUser = () => {
  return {
    type: 'CLEAR_USER',
  }
}

export default userReducer