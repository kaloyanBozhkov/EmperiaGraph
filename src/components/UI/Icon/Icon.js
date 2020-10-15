import React from 'react'

// Pro incons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSpinner,
  faTimes,
  faCog,
  faPlus,
  faMinus,
  faBars,
  faUser
} from '@fortawesome/free-solid-svg-icons'

const Icon = ({ icon }) => {
  switch (icon) {
    case 'spinner':
      return <FontAwesomeIcon icon={faSpinner} />
    case 'close':
      return <FontAwesomeIcon icon={faTimes} />
    case 'cog':
      return <FontAwesomeIcon icon={faCog} />
    case 'plus':
      return <FontAwesomeIcon icon={faPlus} />
    case 'minus':
      return <FontAwesomeIcon icon={faMinus} />
    case 'bars':
      return <FontAwesomeIcon icon={faBars} />
    case 'user':
      return <FontAwesomeIcon icon={faUser} />
    default:
      return <i>Icon not found</i>
  }
}

export default Icon