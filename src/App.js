import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestDataStart } from './redux/data/data.actions'

import Main from '~/pages/Main'
import BaseLayout from './templates/BaseLayout'

import Header from '~/components/Header/Header'

function App({ onRequestFriendsData }) {
  // load friend data
  useEffect(() => {
    onRequestFriendsData()
  }, [onRequestFriendsData])

  return (
    <div className="App">
      <BaseLayout Header={<Header />}>
        <Main />
      </BaseLayout>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loadingFriendData: state.dataReducer.isPending,
})

const mapDispatchToProps = (dispatch) => ({
  onRequestFriendsData: () => dispatch(requestDataStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
