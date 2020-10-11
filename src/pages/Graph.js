import React, { useRef } from 'react'

import styles from './styles.module.scss'

import GraphComponent from '~/components/Graph/Graph'

import useWindowWidth from '~/hooks/useWindowWidth'
import useWindowHeight from '~/hooks/useWindowHeight'
import Controller from '~/components/Graph/Controller/Controller'

const Graph = ({
  friends,
  connections,

  selectedFriend,

  setSelectedFriend,
  clearSelectedFriend,

  connectionStrength,
  changeConnectionStrength,

  connectionDistance,
  changeConnectionDistance,

  withoutMountingAnimation
}) => {
  const graphWrapper = useRef()

  const canvasSize = {
    height: useWindowHeight() - 68,
    width: useWindowWidth(),
  }

  const vertices = JSON.parse(JSON.stringify(friends))
  const edges = JSON.parse(JSON.stringify(connections))

  return (
    <div className={[styles.main, withoutMountingAnimation ? styles.withoutMountingAnimation : undefined].join(' ').trim()} ref={graphWrapper}>
      <GraphComponent
        vertices={vertices}
        edges={edges}
        canvasConfig={canvasSize}

        selectedVertex={selectedFriend}

        setSelectedVertex={setSelectedFriend}
        clearSelectedVertex={clearSelectedFriend}

        connectionStrength={connectionStrength}
        connectionDistance={connectionDistance}
      />
      <div className={styles.controlsWrapper}>
        <Controller
          connectionStrength={connectionStrength}
          changeConnectionStrength={changeConnectionStrength}

          connectionDistance={connectionDistance}
          changeConnectionDistance={changeConnectionDistance}
        />
      </div>
    </div>
  )
}

export default Graph