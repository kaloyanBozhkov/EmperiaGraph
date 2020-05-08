import React from 'react'
import styles from './styles.module.scss'

const Edge = ({ ...otherProps }) => <line className={styles.edge} {...otherProps} />

export default Edge
