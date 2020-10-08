import React from 'react'

import BaseLayout from '~/templates/BaseLayout'

import Graph from '~/containers/Graph.container'

import Header from '~/components/Header/Header'
import InfoWindow from '~/containers/InfoWindow.container'
import Menu from '~/components/Menu/Menu' 

const Main = ({ ...graphProps }) => {
  return (
    <BaseLayout 
      Header={<Header />} 
      Menu={<Menu />} 
      InfoWindow={<InfoWindow />}
    >
      <Graph {...graphProps} />
    </BaseLayout>
  )
}

export default Main