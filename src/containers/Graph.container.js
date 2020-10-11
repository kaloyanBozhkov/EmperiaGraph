import { connect } from 'react-redux'

import { openModal } from '~/redux/modal/modal.actions'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'
import { getPurifiedConnections, getSelectedFriendData } from '~/redux/friend/friend.selector'
import { setConnectionDistance, setConnectionStrength } from '~/redux/graph/graph.actions'

import Graph from '~/pages/Graph'

const mapStateToProps = (state) => ({
  selectedFriend: getSelectedFriendData(state),
  friends: state.requestReducer.friends,
  connections: getPurifiedConnections(state),
  connectionStrength: state.graphReducer.connectionStrength,
  connectionDistance: state.graphReducer.connectionDistance,
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedFriend: (friend) => dispatch(selectFriend(friend)),
  clearSelectedFriend: () => dispatch(clearFriend()),
  changeConnectionStrength: (strength) => dispatch(setConnectionStrength(strength)),
  changeConnectionDistance: (distance) => dispatch(setConnectionDistance(distance)),
  deleteSelectedFriend: (friendId) => dispatch(openModal('removeFriend', { modalLabel: 'Delete friend & connections', friendId })), 
  addConnections: (friendId) => dispatch(openModal('addConnections', { modalLabel: 'Add connections', friendId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
