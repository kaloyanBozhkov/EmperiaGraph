import { connect } from 'react-redux'

import { openModal } from '~/redux/modal/modal.actions'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'
import { getSelectedFriendData } from '~/redux/friend/friend.selector'

import InfoWindow from '~/components/InfoWindow/InfoWindow'
import { requestFriendFail, requestFriendPending, requestFriendSuccess } from '~/redux/request/friends/requestFriend.actions'


const mapStateToProps = (state) => ({
  selectedFriend: getSelectedFriendData(state)
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedFriend: (friend) => dispatch(selectFriend(friend)),
  clearSelectedFriend: () => dispatch(clearFriend()),
  deleteSelectedFriend: (friend, friedName) => dispatch(openModal('confirm', {
    modalLabel: 'Delete friend & connections?',
    label: `Are you sure you want to remove ${friedName} from friends?`,
    onConfirm: () => dispatch(requestFriendPending({
      requestConfig: {
        endpoint: 'friend',
        method: 'DELETE',
        body: { id: friend.id }
      },
      successCallback: requestFriendSuccess,
      failCallback: requestFriendFail
    }))
  })),
  editConnections: (friendId, initialConnections) => dispatch(openModal('editConnections', {
    modalLabel: 'Edit connections',
    initialConnections,
    // onRemoveConnection: () => dispatch(requestConnectionsPending({
    //   requestConfig: {
    //     endpoint: 'friend',
    //     method: 'POST',
    //     body: { id: friend.id }
    //   },
    //   successCallback: requestFriendSuccess,
    //   failCallback: requestFriendFail
    // })),
    // onAddConnection: () => dispatch(requestConnectionsPending({
    //   requestConfig: {
    //     endpoint: 'friend',
    //     method: 'POST',
    //     body: { id: friend.id }
    //   },
    //   successCallback: requestFriendSuccess,
    //   failCallback: requestFriendFail
    // })), 
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow)
