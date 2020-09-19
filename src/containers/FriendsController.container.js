import { connect } from 'react-redux'

import FriendsController from '~/components/FriendsController/FriendsController'

import { openModal } from '~/redux/modal/modal.actions'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onRemoveFriend: () => dispatch(openModal('removeFriend')),
  onAddFriend: () => dispatch(openModal('addFriend'))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsController)
