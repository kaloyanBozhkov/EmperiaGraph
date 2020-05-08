import { compose } from 'redux'
import { connect } from 'react-redux'

import Graph from './Graph'
import { setFriend, clearFriend } from '~/redux/friend/friend.actions'

const mapStateToProps = (state) => ({
  selectedVertex: state.friendReducer.friend,
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedVertex: (friend) => dispatch(setFriend(friend)),
  clearSelectedVertex: () => dispatch(clearFriend()),
})

const GraphContainer = compose(connect(mapStateToProps, mapDispatchToProps))(Graph)

export default GraphContainer
