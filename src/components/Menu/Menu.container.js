import React from 'react'

import Menu from './Menu'
import { compose } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  selectedFriend: state.friendReducer.selectedFriend,
  friends: state.friendReducer.friends,
})

const mapDispatchToProps = (dispatch) => ({})

export default compose(connect(mapStateToProps, mapDispatchToProps)(Menu))
