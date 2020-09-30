import { connect } from 'react-redux'

import { selectFriend } from '~/redux/friend/friend.actions'

import FriendList from '~/components/FriendList/FriendList'

const mapStateToProps = (state) => ({
    friends: state.friendReducer.friends,
    selectedFriend: state.friendReducer.selectedFriend
})

const mapDispatchToProps = (dispatch) => ({
    onSelect: (id) => dispatch(selectFriend(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendList)
