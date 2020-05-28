import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '~/redux/index.sagas'

// Load redux store
import rootReducers from '~/redux/index.reducer'

// Saga middleware
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

// Run logger in dev mode only
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

// store
export const store = createStore(rootReducers, applyMiddleware(...middlewares))

// Run all our sagas
sagaMiddleware.run(rootSaga)

export default store
