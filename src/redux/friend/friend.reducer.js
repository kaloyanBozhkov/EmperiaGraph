import { SET_FRIEND, CLEAR_FRIEND, SELECT_FRIEND } from './friend.constants'

const initialState = {
  selectedFreind: null,
  friends: [],
}

const setFried = (state, friend) => ({ ...state, freinds: [...state.friends, friend] })

const clearFriend = (state) => ({ ...state, friend: null })

const selectFriend = (state, friendIndex) => ({
  ...state,
  selectedFreind: friendIndex,
})

const friendReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FRIEND:
      return setFried(state, action.payload)
    case CLEAR_FRIEND:
      return clearFriend(state)
    case SELECT_FRIEND:
      return selectFriend(state)
    default:
      return state
  }
}

export default friendReducer
