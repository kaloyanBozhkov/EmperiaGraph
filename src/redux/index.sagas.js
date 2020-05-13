import { all, call } from 'redux-saga/effects'
import { requestSagas } from '~/redux/data/data.saga'

function* rootSaga() {
  yield all([requestSagas])
}

export default rootSaga
