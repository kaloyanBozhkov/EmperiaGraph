import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestDataStart } from './redux/data/data.actions'

import Main from '~/pages/Main'
import BaseLayout from './templates/BaseLayout'

import Header from '~/components/Header/Header'
import MenuContainer from './components/Menu/Menu.container'
import { getSelectedFriendData } from './redux/friend/friend.selectors'
import InfoWindow from './components/InfoWindow/InfoWindow'

function App({ onRequestFriendsData, selectedFriendData }) {
  // load friend data
  useEffect(() => {
    onRequestFriendsData()
  }, [onRequestFriendsData])

  return (
    <div className="App">
      <BaseLayout 
        Header={<Header />} 
        Menu={<MenuContainer />} 
        InfoWindow={selectedFriendData && (
        <InfoWindow 
          {...selectedFriendData}
          emperiaFriends={100}
        />)}
      >
        <Main />
      </BaseLayout>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loadingFriendData: state.dataReducer.isPending,
  selectedFriend: state.friendReducer.friends,
  selectedFriendData: getSelectedFriendData(state)
})

const mapDispatchToProps = (dispatch) => ({
  onRequestFriendsData: () => dispatch(requestDataStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
