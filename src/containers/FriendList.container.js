import { connect } from 'react-redux'

import { selectFriend } from '~/redux/friend/friend.actions'
import { getSelectedFriendData } from '~/redux/friend/friend.selector'

import FriendList from '~/components/FriendList/FriendList'

const mapStateToProps = (state) => ({
    friends: state.requestReducer.friends,
    selectedFriend: getSelectedFriendData(state)
})

const mapDispatchToProps = (dispatch) => ({
    onSelect: (id) => dispatch(selectFriend(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendList)
