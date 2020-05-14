import { all, call } from 'redux-saga/effects'
import { dataSagas } from '~/redux/data/data.saga'

function* rootSaga() {
  yield all([call(dataSagas)])
}

export default rootSaga
