import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
    REQUEST_FRIEND_DELETE_PENDING,
    REQUEST_FRIEND_CREATE_PENDING,
    REQUEST_FRIEND_UPDATE_PENDING,
    REQUEST_FRIEND_GET_PENDING
} from './friends/requestFriend.constants'
import {
    REQUEST_CONNECTIONS_DELETE_PENDING,
    REQUEST_CONNECTIONS_CREATE_PENDING,
    REQUEST_CONNECTIONS_UPDATE_PENDING,
    REQUEST_CONNECTIONS_GET_PENDING
} from './connections/requestConnections.constants'
import { REQUEST_FORMATTED_DATA_START } from './request.constants'

import requestBuilder from '~/helpers/requestBuilder'

const createRequest = ({ method, body, endpoint }) => {

    const request = requestBuilder().setMethod(method).setEndpoint(endpoint)

    if (method !== 'GET') {
        const header = new Headers()
        header.append('Content-Type', 'application/json')
        request.setHeaders(header)
    }

    // if no params don't set
    if (body) {
        request.setBody(body)
    }

    return request.build()
}

export function* requestAsync({ payload: { requestConfig, successCallback, failCallback } }) {
    try {
        // build client 
        const request = yield call([createRequest(requestConfig), 'fetchApi'])

        // read body
        const response = yield call([request, 'json'])

        // if error then throw it, else fire action with success response
        if (response.error) {
            throw Error(response.error)
        }
        
        yield put(successCallback(response))
    } catch (error) {
        yield put(failCallback(error.message))
    }
}

// Listner
export function* requestFriendsStart() {
    yield takeLatest(REQUEST_FRIEND_DELETE_PENDING, requestAsync)
    yield takeLatest(REQUEST_FRIEND_CREATE_PENDING, requestAsync)
    yield takeLatest(REQUEST_FRIEND_UPDATE_PENDING, requestAsync)
    yield takeLatest(REQUEST_FRIEND_GET_PENDING, requestAsync)
}

export function* requestConnectionsStart() {
    yield takeLatest(REQUEST_CONNECTIONS_DELETE_PENDING, requestAsync)
    yield takeLatest(REQUEST_CONNECTIONS_CREATE_PENDING, requestAsync)
    yield takeLatest(REQUEST_CONNECTIONS_UPDATE_PENDING, requestAsync)
    yield takeLatest(REQUEST_CONNECTIONS_GET_PENDING, requestAsync)
}

export function* requestDataStart() {
    yield takeLatest(REQUEST_FORMATTED_DATA_START, requestAsync)
}


// Export sagas
export function* requestSagas() {
    yield all([
        call(requestFriendsStart),
        call(requestConnectionsStart),
        call(requestDataStart)
    ])
}

