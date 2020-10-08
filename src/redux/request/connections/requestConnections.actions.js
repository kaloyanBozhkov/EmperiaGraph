import * as constants from './requestConnections.constants'

export const requestConnectionsPending = ({ requestConfig, successCallback, failCallback }) => ({
    type: constants[`REQUEST_CONNECTIONS_${requestConfig.method}_PENDING`],
    payload: { requestConfig, successCallback, failCallback }
})

export const requestConnectionsSuccess = (response) => ({
    type: constants.REQUEST_CONNECTIONS_SUCCESS,
    payload: response
})

export const requestConnectionsFail = (error) => ({
    type: constants.REQUEST_CONNECTIONS_FAIL,
    payload: error
})