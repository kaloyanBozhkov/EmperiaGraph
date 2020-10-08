import * as constants from './requestFriend.constants'

export const requestFriendPending = ({ requestConfig, successCallback, failCallback }) => ({
    type: constants[`REQUEST_FRIEND_${requestConfig.method}_PENDING`],
    payload: { requestConfig, successCallback, failCallback }
})

export const requestFriendSuccess = (response) => ({
    type: constants.REQUEST_FRIEND_SUCCESS,
    payload: response
})

export const requestFriendFail = (error) => ({
    type: constants.REQUEST_FRIEND_FAIL,
    payload: error
})