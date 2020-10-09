import { all, call, put, takeLatest } from 'redux-saga/effects'

import { selectFriend } from '~/redux/friend/friend.actions'
import { REQUEST_FRIEND_SUCCESS } from './requestFriend.constants'

export function* requestFriendTriggers ({ payload }) {
    if (payload?.operation === 'CREATE_FRIEND') {
        return yield put(selectFriend(payload.payload.friendData.id))
    }
}

// Listner
export function* requestFriendSelectCreatedStart () {
    yield takeLatest(REQUEST_FRIEND_SUCCESS, requestFriendTriggers)
}


// Export sagas
export function* requestFriendSagas() {
    yield all([
        call(requestFriendSelectCreatedStart),
    ])
}

