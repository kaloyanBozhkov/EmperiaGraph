import { all, call, put, takeLatest } from 'redux-saga/effects'

// import * as selectors from '~/redux/selectors.saga'
import { REQUEST_DATA_START } from './data.constants'
import { requestDataSuccess, requestDataFail } from '~/redux/data/data.actions'
import { setFriends } from '~/redux/friend/friend.actions'

import requestBuilder from '~/helpers/requestBuilder'
import formatFriends from '~/helpers/formatFriends'
import formatEdges from '~/helpers/formatEdges'

export function* requestDataAsync() {
  try {
    const request = requestBuilder().setUrl('friends').build()
    const response = yield request.fetchApi()
    const friendsResponse = yield response.json()

    const request2 = requestBuilder().setUrl('connections').build()
    const response2 = yield request2.fetchApi()
    const connectionsResponse = yield response2.json()

    const friends = friendsResponse?.results || []
    const connections = connectionsResponse?.results || []

    // edges/connections has 
    const formattedConnections = formatEdges(connections, friends)
    const formattedFriends = formatFriends(friends, formattedConnections)

    yield all([
      // update redux store with the unformatted data
      put(requestDataSuccess({ friends, connections })),

      // update friends reducer with new optimized friends
      put(setFriends(formattedFriends)), 
    ])

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
