import React from 'react'

import Menu from './Menu'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { selectFriend } from '~/redux/friend/friend.actions'

const mapStateToProps = (state) => ({
  selectedFriend: state.friendReducer.selectedFriend,
  friends: state.friendReducer.friends,
})

const mapDispatchToProps = (dispatch) => ({
  onSelectFriend: (id) => dispatch(selectFriend(id))
})


export default compose(connect(mapStateToProps, mapDispatchToProps)(Menu))
