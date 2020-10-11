import { all, call } from 'redux-saga/effects'
import { requestSagas } from './request/request.saga'
import { requestFriendSagas } from './request/friends/requestFriend.saga'

function* rootSaga() {
  yield all([call(requestSagas), call(requestFriendSagas)])
}

export default rootSaga
