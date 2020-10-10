import { connect } from 'react-redux'

import { closeModal, openModal } from '~/redux/modal/modal.actions'
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
  // open removeFriend modal and on save open confirm modal which then fires DELETE request
  removeConnection: (friendId, friendName, initialConnections) => dispatch(openModal('removeConnections', {
    modalLabel: 'Remove connections',
    initialConnections,
    friendName,
    friendId,
    onRemoveConnections: (connectionIds) => dispatch(openModal('confirm', {
      label: `Are you sure you want to delete ${connectionIds.length} connection${connectionIds.length > 1 ? 's' : ''} for ${friendName}?`,
      modalLabel: 'Confirm deletetion',
      onSave: () => {
        dispatch(requestConnectionsPending({
          requestConfig: {
            endpoint: 'connections',
            method: 'DELETE',
            body: { connectionIds }
          },
          successCallback: requestConnectionsSuccess,
          failCallback: requestConnectionsFail
        }))

        dispatch(closeModal())
      }
    }))
  })),
  // edit Friend re-uses same modal as add friend!
  editFriend: (selectedFriend) => dispatch(openModal('addFriend', { 
    modalLabel: 'Edit Friend', 
    initialValues: {
      sex: selectedFriend.sex,
      firstName: selectedFriend.firstName,
      lastName: selectedFriend.lastName,
      totalFriends: selectedFriend.totalFriends,
      id: selectedFriend.id
    },
    onAddFriend: (friendData) => dispatch(requestFriendPending({
      requestConfig: {
        method: 'PUT',
        endpoint: 'friend',
        body: friendData
      },
      successCallback: requestFriendSuccess,
      failCallback: requestFriendFail
    }))
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow)
