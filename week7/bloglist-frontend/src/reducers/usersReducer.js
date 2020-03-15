const usersReducer = (state = '', action) => {
    switch(action.type) {
      case 'SET_USERS':
        return action.data
      case 'CLEAR_USERS':
        return ''
      default:
        return state
    }
  }
  
  export const setUsers = (user) => {
    return {
      type: 'SET_USERS',
      data: user,
    }
  }
  
  export const abolishUsers = () => {
    return {
      type: 'CLEAR_USERS',
    }
  }
  
  export default usersReducer