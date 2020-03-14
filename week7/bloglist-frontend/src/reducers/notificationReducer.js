const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: notification,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
