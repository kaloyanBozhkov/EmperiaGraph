import React from 'react'

// Pro incons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSpinner,
  faTimes,
  faCog
} from '@fortawesome/free-solid-svg-icons'

const Icon = ({ icon }) => {
  switch (icon) {
    case 'spinner':
      return <FontAwesomeIcon icon={faSpinner} />
    case 'close':
      return <FontAwesomeIcon icon={faTimes} />
    case 'cog':
      return <FontAwesomeIcon icon={faCog} />
    default:
      return <i>Icon not found</i>
  }
}

export default Icon