import { compose } from 'redux'
import { connect } from 'react-redux'

import Graph from './Graph'
import { clearFriend, selectFriend } from '~/redux/friend/friend.actions'
import { createStructuredSelector } from 'reselect'
import { getSelectedFriend } from '~/redux/friend/friend.selectors'

const mapStateToPropsSelector = createStructuredSelector({
  selectedFriend: getSelectedFriend,
})
const mapDispatchToProps = (dispatch) => ({
  setSelectedVertex: (friend) => dispatch(selectFriend(friend)),
  clearSelectedVertex: () => dispatch(clearFriend()),
})

const GraphContainer = compose(connect(mapStateToPropsSelector, mapDispatchToProps))(Graph)

export default GraphContainer
