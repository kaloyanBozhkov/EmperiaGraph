import { REQUEST_DATA_FAIL, REQUEST_DATA_START, REQUEST_DATA_SUCCESS } from './data.constants'

const initState = {
  isPending: false,
  error: null,
  data: {
    connections: [],
    friends: []
  }
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

const requestDataSuccess = (state, { friends, connections }) => ({
  ...state,
  isPending: false,
  data: {
    friends,
    connections
  }
})

const dataReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case REQUEST_DATA_START:
      return requestDataStart(state)
    case REQUEST_DATA_SUCCESS:
      return requestDataSuccess(state, action.payload)
    case REQUEST_DATA_FAIL:
      return requestDataFail(state, action.payload)
    default:
      return state
  }
}

export default dataReducer
