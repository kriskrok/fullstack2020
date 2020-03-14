import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'

const store = createStore(notificationReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </ Provider>,
  document.getElementById('root')
)