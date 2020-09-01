import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

import Icon from '~/components/UI/Icon/Icon'

const Loading = ({ loadingMsg, modifier }) => {
  const classes = [styles.loading, styles[modifier]]
    .join(' ')
    .trim()

  return (
    <div className={classes}>
      <Icon icon="spinner" />
      {loadingMsg && <p>{loadingMsg}</p>}
    </div>
  )
}

Loading.propTypes = {
  loadingMsg: PropTypes.string,
  modifier: PropTypes.string
}

export default Loading