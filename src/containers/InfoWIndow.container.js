import { compose } from 'redux'
import { connect } from 'react-redux'

import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'

import Main from '~/components/InfoWindow/InfoWindow'

const mapStateToProps = (state) => ({
  selectedFriend: state.friendReducer.selectedFriend,
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedFriend: (friend) => dispatch(selectFriend(friend)),
  clearSelectedFriend: () => dispatch(clearFriend())
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)(Main),
)
