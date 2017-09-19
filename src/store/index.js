import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from './reducer'

export default preloadedState =>
  createStore(reducer, preloadedState, applyMiddleware(createLogger()))
