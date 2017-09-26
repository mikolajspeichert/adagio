import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'

export default preloadedState =>
  createStore(reducer, preloadedState, applyMiddleware(thunk, createLogger()))
