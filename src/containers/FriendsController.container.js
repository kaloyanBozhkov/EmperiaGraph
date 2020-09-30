import { connect } from 'react-redux'

import { openModal } from '~/redux/modal/modal.actions'

import FriendsController from '~/components/FriendsController/FriendsController'


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  onAddFriend: () => dispatch(openModal('addFriend', { modalLabel: 'Add Friend' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsController)
