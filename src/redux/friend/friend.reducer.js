import { SET_FRIEND, CLEAR_FRIEND } from './friend.constants'

const initialState = {
  friend: null,
}

const setFried = (state, friend) => ({ ...state, friend })

const clearFriend = (state) => ({ ...state, friend: null })

const friendReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FRIEND:
      return setFried(state, action.payload)
    case CLEAR_FRIEND:
      return clearFriend(state)
    default:
      return state
  }
}

export default friendReducer
