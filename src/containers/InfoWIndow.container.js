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
  deleteSelectedFriend: (friendId, friedName) => dispatch(openModal('confirm', {
    modalLabel: 'Delete friend & connections?',
    label: `Are you sure you want to remove ${friedName} from friends?`,
    onConfirm: () => requestFriendPending({
      requestConfig: {
        endpoint: 'connections',
        method: 'DELETE',
        body: friendId
      },
      successCallback: requestFriendSuccess,
      failCallback: requestFriendFail
    })
  })),
  editConnections: (friendId, friedName) => dispatch(openModal('editConnections', {
    modalLabel: 'Edit connections',
    onSaveEdit: () => console.log(friendId) //dispatch(removeFriend(friendId))
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow)
