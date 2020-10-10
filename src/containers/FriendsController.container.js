import { connect } from 'react-redux'

import { openModal } from '~/redux/modal/modal.actions'

import FriendsController from '~/components/FriendsController/FriendsController'
import { requestFriendFail, requestFriendPending, requestFriendSuccess } from '~/redux/request/friends/requestFriend.actions'


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  onAddFriend: () => dispatch(openModal('addEditFriend', { 
    modalLabel: 'Add Friend', 
    onAddFriend: (friendData) => dispatch(requestFriendPending({
      requestConfig: {
        method: 'POST',
        endpoint: 'friend',
        body: friendData
      },
      successCallback: requestFriendSuccess,
      failCallback: requestFriendFail
    }))
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsController)
