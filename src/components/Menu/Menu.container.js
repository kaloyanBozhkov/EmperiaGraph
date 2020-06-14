import React from 'react'

import Menu from './Menu'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { selectFriend } from '~/redux/friend/friend.actions'
import { createStructuredSelector } from 'reselect'
import { getSelectedFriend, getFriends } from '~/redux/friend/friend.selectors'
import { getFormattedConnections } from '~/redux/connections/connections.selectors'

const mapStateToPropsSelector = createStructuredSelector({
  selectedFriend: getSelectedFriend,
  friends: getFriends,
  connections: getFormattedConnections
})

const mapDispatchToProps = (dispatch) => ({
  onSelectFriend: (id) => dispatch(selectFriend(id))
})


export default compose(connect(mapStateToPropsSelector, mapDispatchToProps)(Menu))
