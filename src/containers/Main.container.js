import { connect } from 'react-redux'
import { compose } from 'redux'

import Main from '~/pages/Main'

import { requestDataStart } from '~/redux/data/data.actions'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'

import withLoading from '~/hoc/withPageLoading'
import withDispatch from '~/hoc/withDispatch'
import { selectPurifiedConnections, getSelectedFriendId } from '~/redux/friend/friend.selector'

const mapStateToProps = (state) => ({
  isLoading: state.dataReducer.isPending,
  
  selectedFriend: getSelectedFriendId(state),
  friends: state.friendReducer.friends,

  connectionsPurified: selectPurifiedConnections(state),
})


const mapDispatchToProps = (dispatch) => ({
  setSelectedFriend: (friend) => dispatch(selectFriend(friend)),
  clearSelectedFriend: () => dispatch(clearFriend())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDispatch(requestDataStart()),
  withLoading({ loadingMsg: 'Fetching data from server..', modifier: 'absolutelyPositioned' }),
)(Main)
