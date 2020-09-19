import { connect } from 'react-redux'

import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'

import InfoWindow from '~/components/InfoWindow/InfoWindow'

const mapStateToProps = (state) => ({
  selectedFriend: state.friendReducer.selectedFriend,
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedFriend: (friend) => dispatch(selectFriend(friend)),
  clearSelectedFriend: () => dispatch(clearFriend())
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow)
