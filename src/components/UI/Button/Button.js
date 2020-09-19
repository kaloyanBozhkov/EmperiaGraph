import React from 'react'

import styles from './styles.module.scss'

const Button = ({ label, onClick = (f) => f, ...otherProps }) => {
    return (
        <button className={styles.button} onClick={onClick} {...otherProps}>{label}</button>
    )
}

export default Button