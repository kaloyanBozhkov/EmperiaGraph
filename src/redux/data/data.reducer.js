import { REQUEST_DATA_FAIL, REQUEST_DATA_START, REQUEST_DATA_SUCCESS } from './data.constants'

const initState = {
  isPending: false,
  error: null,
}

const requestDataStart = (state) => ({
  ...state,
  isPending: true,
})

const requestDataFail = (state, error) => ({
  ...state,
  isPending: false,
  error,
})

const requestDataSuccess = (state, response) => ({
  ...state,
  isPending: true,
})

const dataReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case REQUEST_DATA_START:
      return requestDataStart(state)
    case REQUEST_DATA_SUCCESS:
      return requestDataSuccess(state)
    case REQUEST_DATA_FAIL:
      return requestDataFail(state, action.payload)
    default:
      return state
  }
}

export default dataReducer
