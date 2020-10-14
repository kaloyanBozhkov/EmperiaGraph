import { CLEAR_FRIEND, SELECT_FRIEND } from './friend.constants'

const initialState = {
  selectedFriend: null,
  // friends: []
}

// const setFriends = (state, friends) => ({ ...state, friends })

const clearFriend = (state) => ({ ...state, selectedFriend: null })

const selectFriend = (state, friendId) => ({
  ...state,
  selectedFriend: friendId === state.selectedFriend ? null : friendId
})

const friendReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case SET_FRIENDS:
    //   return setFriends(state, action.payload)
    case CLEAR_FRIEND:
      return clearFriend(state)
    case SELECT_FRIEND:
      return selectFriend(state, action.payload)
    default:
      return state
  }
}

export default friendReducer
