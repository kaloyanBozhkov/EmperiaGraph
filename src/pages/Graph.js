import React, { useRef } from 'react'

import styles from './styles.module.scss'

import GraphComponent from '~/components/Graph/Graph'

import useWindowWidth from '~/hooks/useWindowWidth'
import useWindowHeight from '~/hooks/useWindowHeight'

const Graph = ({
  friends,
  connectionsPurified,

  selectedFriend,

  setSelectedFriend,
  clearSelectedFriend,
}) => {
  const graphWrapper = useRef()
  
  const canvasSize = {
    height: useWindowHeight() - 68,
    width: useWindowWidth(),
  }

  return (
    <div className={styles.main} ref={graphWrapper}>
      <GraphComponent
        vertices={friends}
        edges={connectionsPurified}
        canvasConfig={canvasSize}

        selectedVertex={selectedFriend}
        
        setSelectedVertex={setSelectedFriend}
        clearSelectedVertex={clearSelectedFriend}
      />
    </div>
  )
}

export default Graph