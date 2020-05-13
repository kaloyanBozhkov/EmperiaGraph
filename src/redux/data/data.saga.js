import { all, call, put, takeLatest, select } from 'redux-saga/effects'

// import * as selectors from '~/redux/selectors.saga'
import { REQUEST_DATA_START } from './data.constants'

export function* requestDataAsync() {
  try {
  } catch (error) {}
}

// Listner
export function* requestDepositLimitStart() {
  yield takeLatest(REQUEST_DATA_START, requestDataAsync)
}

// Export our sagas
export function* requestSagas() {
  yield all([call(requestDepositLimitStart)])
}
