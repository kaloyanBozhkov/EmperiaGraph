import React from 'react'

// Pro incons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

const Icon = ({ icon }) => {
  switch (icon) {
    case 'spinner':
      return <FontAwesomeIcon icon={faSpinner} />
    default:
      return <i>Icon not found</i>
  }
}

export default Icon