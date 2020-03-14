import React from 'react'

const Button = ({ onClick, buttonLabel }) => (
  <button onClick={() => onClick()}>
    {buttonLabel}
  </button>
)

export default Button
