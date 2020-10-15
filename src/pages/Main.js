import React, { useEffect } from 'react'

import BaseLayout from '~/templates/BaseLayout'

import Graph from '~/containers/Graph.container'

import Header from '~/components/Header/Header'
import InfoWindow from '~/containers/InfoWindow.container'
import Menu from '~/components/Menu/Menu'
import useWindowWidth from '~/hooks/useWindowWidth'

const Main = ({ activeMenu, onToggleMenu, ...graphProps }) => {
  const windowWidth = useWindowWidth()
  const isDesktop = windowWidth > 850

  useEffect(() => {
    onToggleMenu(isDesktop)
  }, [isDesktop, onToggleMenu])

  return (
    <BaseLayout
      Header={<Header activeMenu={activeMenu} toggleMenu={onToggleMenu} />}
      Menu={<Menu isMobile={!isDesktop} />}
      InfoWindow={<InfoWindow />}
      activeMenu={activeMenu} 
    >
      <Graph {...graphProps} />
    </BaseLayout>
  )
}

export default Main