import React from 'react'

import BaseLayout from '~/templates/BaseLayout'
import Graph from '~/pages/Graph'
import Header from '~/components/Header/Header'
import InfoWindow from '~/containers/InfoWIndow.container'
import MenuContainer from '~/containers/Menu.container' 

const Main = ({ ...graphProps }) => {
  return (
    <BaseLayout 
      Header={<Header />} 
      Menu={<MenuContainer />} 
      InfoWindow={<InfoWindow />}
    >
      <Graph {...graphProps} />
    </BaseLayout>
  )
}

export default Main