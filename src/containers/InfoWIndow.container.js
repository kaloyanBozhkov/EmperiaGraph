import { connect } from 'react-redux'

import { openModal } from '~/redux/modal/modal.actions'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'

import InfoWindow from '~/components/InfoWindow/InfoWindow'
import { dispatch } from 'd3'

const mapStateToProps = (state) => ({
  selectedFriend: state.friendReducer.selectedFriend,
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedFriend: (friend) => dispatch(selectFriend(friend)),
  clearSelectedFriend: () => dispatch(clearFriend()),
  deleteSelectedFriend: (friendId, friedName) => dispatch(openModal('confirm', { 
    modalLabel: 'Delete friend & connections?', 
    label: `Are you sure you want to remove ${friedName} from friends?`,
    onConfirm: () => console.log(friendId) //dispatch(removeFriend(friendId))
  })),
  editConnections: (friendId, friedName) => dispatch(openModal('editConnections', { 
    modalLabel: 'Edit connections', 
    onSaveEdit: () => console.log(friendId) //dispatch(removeFriend(friendId))
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow)
