import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'
import '../App.css'

const Notification = ({ message }) => {
  const dispatch = useDispatch()
  const note = useSelector(state => state.notification)

  if (!note) return null

  setTimeout(() => {
    dispatch(clearNotification())
  }, 10000)

  return (
    <div className="notification">
      {note}
    </div>
  )
}

export default Notification
