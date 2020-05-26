import { all, call, put, takeLatest } from 'redux-saga/effects'

// import * as selectors from '~/redux/selectors.saga'
import { REQUEST_DATA_START } from './data.constants'
import { requestDataSuccess, requestDataFail } from '~/redux/data/data.actions'

import requestBuilder from '~/helpers/requestBuilder'
import { setFriends } from '../friend/friend.actions'

export function* requestDataAsync() {
  try {
    const request = requestBuilder().setUrl('friends').build()
    const response = yield request.fetchApi()
    const data = yield response.json()

    yield put(requestDataSuccess(data))
    yield put(setFriends(data))
  } catch (error) {
    yield put(requestDataFail(error))
  }
}

// Listner
export function* dataStart() {
  yield takeLatest(REQUEST_DATA_START, requestDataAsync)
}

// Export our sagas
export function* dataSagas() {
  yield all([call(dataStart)])
}
