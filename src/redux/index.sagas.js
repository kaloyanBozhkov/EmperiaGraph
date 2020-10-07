import { all, call } from 'redux-saga/effects'
import { requestSagas } from '~/redux/request/request.saga'

function* rootSaga() {
  yield all([call(requestSagas)])
}

export default rootSaga
