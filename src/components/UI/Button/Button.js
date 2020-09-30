import React from 'react'

import styles from './styles.module.scss'

const Button = ({ label, modifier = 'primary', onClick = (f) => f, ...otherProps }) => {
    
    const modifiers = typeof modifier === 'string' ? styles[modifier] : modifier.reduce((acc, mod) => acc + ' ' + styles[mod], ' ')

    return (
        <button className={[styles.button, modifiers].join(' ').trim()} onClick={onClick} {...otherProps}>{label}</button>
    )
}

export default Button