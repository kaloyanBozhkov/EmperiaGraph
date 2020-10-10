import { connect } from 'react-redux'

import { openModal } from '~/redux/modal/modal.actions'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'
import { getSelectedFriendData } from '~/redux/friend/friend.selector'

import InfoWindow from '~/components/InfoWindow/InfoWindow'
import { requestFriendFail, requestFriendPending, requestFriendSuccess } from '~/redux/request/friends/requestFriend.actions'
import { requestConnectionsFail, requestConnectionsPending, requestConnectionsSuccess } from '~/redux/request/connections/requestConnections.actions'


const mapStateToProps = (state) => ({
  selectedFriend: getSelectedFriendData(state),
  friends: state.requestReducer.friends
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
  addConnection: (f) => f,
  removeConnection: (friendId, friendName, initialConnections) => dispatch(openModal('removeConnections', {
    modalLabel: 'Remove connections',
    initialConnections,
    friendName,
    friendId,
    onRemoveConnections: (connectionIds) => dispatch(openModal('confirm', {
      label: `Are you sure you want to delete ${connectionIds.length} connection${connectionIds.length > 1 ? 's' : ''} for ${friendName}?`,
      modalLabel: 'Confirm delete connection',
      onSave: () => dispatch(requestConnectionsPending({
        requestConfig: {
          endpoint: 'connections',
          method: 'DELETE',
          body: { connectionIds }
        },
        successCallback: requestConnectionsSuccess,
        failCallback: requestConnectionsFail
      }))
    }))
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow)
