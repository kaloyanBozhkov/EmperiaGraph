import * as constants from './requestFriend.constants'

export const requestFriendPending = (config) => ({
    type: constants[`REQUEST_FRIEND_${config.method}_PENDING`],
    payload: config
})

export const requestFriendSuccess = (response) => ({
    type: constants.REQUEST_FRIEND_SUCCESS,
    payload: response
})

export const requestFriendFail = (error) => ({
    type: constants.REQUEST_FRIEND_FAIL,
    payload: error
})