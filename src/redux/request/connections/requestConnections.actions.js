import * as constants from './requestConnections.constants'

export const requestConnectionsPending = (config) => ({
    type: constants[`REQUEST_CONNECTIONS_${config.method}_PENDING`],
    payload: config
})

export const requestConnectionsSuccess = (response) => ({
    type: constants.REQUEST_CONNECTIONS_SUCCESS,
    payload: response
})

export const requestConnectionsFail = (error) => ({
    type: constants.REQUEST_CONNECTIONS_FAIL,
    payload: error
})