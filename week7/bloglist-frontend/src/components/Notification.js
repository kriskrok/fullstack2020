import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'
import '../App.css'

const Notification = ({ message }) => {
  const dispatch = useDispatch()
  const note = useSelector(state => state)

  if (!note) return null

  const aa = 'it begins'
  console.log(aa)

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
