import { SET_FRIEND, CLEAR_FRIEND, SELECT_FRIEND, SET_FRIENDS, SET_FORMATTED_CONNECTIONS } from './friend.constants'

const initialState = {
  selectedFriend: null,
  friends: [],
  connections: []
}

const setFriends = (state, friends) => ({ ...state, friends })

const setFriend = (state, friend) => ({ ...state, freinds: [...state.friends, friend] })

const clearFriend = (state) => ({ ...state, friend: null })

const selectFriend = (state, friendIndex) => ({
  ...state,
  selectedFriend: +friendIndex,
})

const friendReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FRIENDS:
      return setFriends(state, action.payload)
    case SET_FRIEND:
      return setFriend(state, action.payload)
    case CLEAR_FRIEND:
      return clearFriend(state)
    case SELECT_FRIEND:
      return selectFriend(state, action.payload)

    default:
      return state
  }
}

export default friendReducer
