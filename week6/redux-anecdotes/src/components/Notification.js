import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>

      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

 //ensimmäinen parametri määrittää funktion joka liittää storen tilassa määriteltyjä asioita
 // yhdistetyn komponentin propseiksi
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification