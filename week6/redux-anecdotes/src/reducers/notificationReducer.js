const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': 
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (notification, timer) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }  
    })

    await new Promise(resolve => setTimeout(resolve, timer * 1000))

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification: '' }
    })
  }
}

export const setNotification1 = (notification, time) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification }
  }
}

export default notificationReducer