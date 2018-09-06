import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import reducer from './reducer'

const middlewares = [thunk]
const enhancers = [applyMiddleware(...middlewares)]

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
    : compose
/* eslint-enable */

export default createStore(reducer, {}, composeEnhancers(...enhancers))
