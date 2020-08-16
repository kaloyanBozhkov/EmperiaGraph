import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestDataStart } from './redux/data/data.actions'

import Main from '~/containers/Main'
import BaseLayout from './templates/BaseLayout'
import Header from '~/components/Header/Header'
import InfoWindow from './components/InfoWindow/InfoWindow'
import MenuContainer from './components/Menu/Menu.container'

import { getSelectedFriendData } from './redux/friend/friend.selectors'
import { getFormattedConnections } from './redux/connections/connections.selectors'

function App({ onRequestFriendsData, selectedFriendData, connections }) {
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
            emperiaFriends={selectedFriendData &&
            connections[selectedFriendData.id] &&
            connections[selectedFriendData.id].length}
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
  selectedFriendData: getSelectedFriendData(state),
  connections: getFormattedConnections(state)
})

const mapDispatchToProps = (dispatch) => ({
  onRequestFriendsData: () => dispatch(requestDataStart()),
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
