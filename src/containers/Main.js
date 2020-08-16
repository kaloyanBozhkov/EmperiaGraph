import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getSelectedFriend, getFriends } from '~/redux/friend/friend.selectors'
import { getConnections, getFormattedConnections } from '~/redux/connections/connections.selectors'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'

import Main from '~/pages/Main'

const mapStateToPropsSelector = createStructuredSelector({
  selectedVertex: getSelectedFriend,
  verticesData: getFriends,
  edgesData: getConnections,
  connections: getFormattedConnections
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedVertex: (friend) => dispatch(selectFriend(friend)),
  clearSelectedVertex: () => dispatch(clearFriend())
})

export default compose(
    connect(mapStateToPropsSelector, mapDispatchToProps)(Main)
)
