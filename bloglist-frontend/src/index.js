
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import './index.css'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))
