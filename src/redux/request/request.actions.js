import {
    REQUEST_FORMATTED_DATA_START, 
    REQUEST_FORMATTED_DATA_FAIL,
    REQUEST_FORMATTED_DATA_SUCCESS,
    REQUEST_RETRY
} from './request.constants'

export const requestFormattedDataStart = ({ requestConfig, successCallback, failCallback }) => ({
    type: REQUEST_FORMATTED_DATA_START,
    payload: { requestConfig, successCallback, failCallback }
})

export const requestFormattedDataSuccess = (friends) => ({
    type: REQUEST_FORMATTED_DATA_SUCCESS,
    payload: friends
})

export const requestFormattedDataFail = (err) => ({
    type: REQUEST_FORMATTED_DATA_FAIL,
    payload: err
})

export const requestRetry = (previousRequestConfig) => ({
    type: REQUEST_RETRY,
    payload: previousRequestConfig
})