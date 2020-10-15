import { connect } from 'react-redux'

import { selectFriend } from '~/redux/friend/friend.actions'
import { getSelectedFriendData } from '~/redux/friend/friend.selector'
import { onToggleMenu } from '~/redux/menu/menu.actions'

import FriendList from '~/components/FriendList/FriendList'

const mapStateToProps = (state) => ({
    friends: state.requestReducer.friends,
    selectedFriend: getSelectedFriendData(state),
})

const mapDispatchToProps = (dispatch) => ({
    onSelect: ({ friendId: id, selected }) => dispatch(selectFriend(selected ? null : id)),
    onCloseMenu: () => dispatch(onToggleMenu(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendList)
