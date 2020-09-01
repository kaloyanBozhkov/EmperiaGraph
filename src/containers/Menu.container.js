import { compose } from 'redux'
import { connect } from 'react-redux'

import Menu from '~/components/Menu/Menu'

import { selectFriend } from '~/redux/friend/friend.actions'

const mapStateToProps = (state) => ({
  friends: state.friendReducer.friends,
  selectedFriend: state.friendReducer.selectedFriend
})

const mapDispatchToProps = (dispatch) => ({
  onSelectFriend: (id) => dispatch(selectFriend(id))
})

export default compose(connect(mapStateToProps, mapDispatchToProps)(Menu))