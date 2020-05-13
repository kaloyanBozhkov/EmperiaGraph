import { REQUEST_DATA_FAIL, REQUEST_DATA_START, REQUEST_DATA_SUCCESS } from './data.constants'

export const requestDataStart = () => ({
  type: REQUEST_DATA_START,
})
export const requestDataFail = (error) => ({
  type: REQUEST_DATA_FAIL,
  payload: error,
})
export const requestDataSuccess = (friends) => ({
  type: REQUEST_DATA_SUCCESS,
  payload: friends,
})
