import { all, call, put, takeLatest } from 'redux-saga/effects'

// import * as selectors from '~/redux/selectors.saga'
import { REQUEST_DATA_START } from './data.constants'
import { requestDataSuccess, requestDataFail } from '~/redux/data/data.actions'

import requestBuilder from '~/helpers/requestBuilder'
import { setFriends } from '../friend/friend.actions'
import { setConnections } from '../connections/connections.actions'

export function* requestDataAsync() {
  try {
    const request = requestBuilder().setUrl('friends').build()
    const response = yield request.fetchApi()
    const friends = yield response.json()

    const request2 = requestBuilder().setUrl('connections').build()
    const response2 = yield request2.fetchApi()
    const connecitons = yield response2.json()

    yield put(requestDataSuccess({ friends, connecitons }))
    yield put(setFriends(friends.results))
    yield put(setConnections(connecitons.results))
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
