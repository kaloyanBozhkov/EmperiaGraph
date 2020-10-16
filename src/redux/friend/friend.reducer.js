import { CLEAR_FRIEND, SELECT_FRIEND } from './friend.constants'

const initialState = {
  selectedFriend: null,
}

// @TODO to be removed since select friend replaces it
const clearFriend = (state) => ({ ...state, selectedFriend: null })

const selectFriend = (state, friendId) => ({
  ...state,
  selectedFriend: friendId === state.selectedFriend ? null : friendId
})

const friendReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_FRIEND:
      return clearFriend(state)
    case SELECT_FRIEND:
      return selectFriend(state, action.payload)
    default:
      return state
  }
}

export default friendReducer
