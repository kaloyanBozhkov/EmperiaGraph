import React from 'react'
import Icon from '../Icon/Icon'

import styles from './styles.module.scss'

const Button = ({ label, modifier = 'primary', onClick = (f) => f, icon, ...otherProps }) => {
    
    const modifiers = typeof modifier === 'string' ? styles[modifier] : modifier.reduce((acc, mod) => acc + ' ' + styles[mod], ' ')

    return (
        <button className={[styles.button, modifiers].join(' ').trim()} onClick={onClick} {...otherProps}>
            {icon && <Icon icon={icon} />}
            {label}
        </button>
    )
}

export default Button