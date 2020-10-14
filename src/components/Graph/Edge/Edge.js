import React from 'react'
import styles from './styles.module.scss'

const Edge = ({ id, ...otherProps }) => <line  key={id} className={styles.edge} {...otherProps} />

export default Edge
