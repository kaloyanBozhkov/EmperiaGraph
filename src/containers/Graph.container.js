import { connect } from 'react-redux'

import { openModal } from '~/redux/modal/modal.actions'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'
import { selectPurifiedConnections } from '~/redux/friend/friend.selector'

import Graph from '~/pages/Graph'

const mapStateToProps = (state) => ({
  selectedFriend: state.friendReducer.selectedFriend,
  friends: state.friendReducer.friends,

  connectionsPurified: selectPurifiedConnections(state),
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedFriend: (friend) => dispatch(selectFriend(friend)),
  clearSelectedFriend: () => dispatch(clearFriend()),
  deleteSelectedFriend: (friendId) => dispatch(openModal('removeFriend', { modalLabel: 'Delete friend & connections', friendId })), 
  addConnections: (friendId) => dispatch(openModal('addConnections', { modalLabel: 'Add connections', friendId }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
