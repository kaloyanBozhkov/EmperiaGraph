import React, { useEffect, useState } from 'react'

import BaseLayout from '~/templates/BaseLayout'

import Graph from '~/containers/Graph.container'

import Header from '~/components/Header/Header'
import InfoWindow from '~/containers/InfoWindow.container'
import Menu from '~/components/Menu/Menu'
import useWindowWidth from '~/hooks/useWindowWidth'

const Main = ({ ...graphProps }) => {
  const windowWidth = useWindowWidth()
  const [activeMenu, toggleMneu] = useState()

  useEffect(() => {
    toggleMneu(windowWidth > 850)
  }, [windowWidth])

  return (
    <BaseLayout
      Header={<Header activeMenu={activeMenu} toggleMenu={toggleMneu} />}
      Menu={<Menu />}
      InfoWindow={<InfoWindow />}
      activeMenu={activeMenu} 
    >
      <Graph {...graphProps} />
    </BaseLayout>
  )
}

export default Main