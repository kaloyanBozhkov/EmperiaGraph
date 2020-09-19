import React from 'react'

import styles from './styles.module.scss'

const Input = ({ label, value, onChange, ...otherProps }) => {
    return (
        <div className={styles.input}>
            {label && <p>{label}</p>}
            <input
                value={value}
                onChange={onChange}
                {...otherProps}
            />
      </div>
    )
}

export default Input