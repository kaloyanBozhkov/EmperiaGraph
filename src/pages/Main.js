import React, { useRef } from 'react'

import BaseLayout from '~/templates/BaseLayout'
import Graph from '~/pages/Graph'
import Header from '~/components/Header/Header'
import InfoWindow from '~/containers/InfoWIndow.container'
import MenuContainer from '~/containers/Menu.container' 

const Main = ({ selectedFriend, friends, connectionsPurified }) => {
  return (
    <BaseLayout 
      Header={<Header />} 
      Menu={<MenuContainer />} 
      InfoWindow={<InfoWindow />}
    >
      <Graph 
        friends={friends}
        selectedFriend={selectedFriend} 
        connectionsPurified={connectionsPurified}
      />
    </BaseLayout>
  )
}

export default Main