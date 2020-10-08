import React from 'react'

import styles from './styles.module.scss'

// very quick & simple input that handles text/number and select types
const Input = ({ label, value, onChange, type, modifier, ...otherProps }) => {

    let input = (
        <input
            value={value}
            onChange={onChange}
            {...otherProps}
        />
    )

    if (type === 'select') {
        const { options, ...selectProps } = otherProps
        input = (
            <select className={styles.select} value={value} onChange={onChange} {...selectProps}>
                {options.map((option, index) => (
                        <option key={`${option}${index}`} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        )
    }

    return (
        <div className={[styles.input, ...(modifier ? [styles[modifier]]: [])].join(' ').trim()}>
            {label && <p>{label}</p>}
            {input}
        </div>
    )
}

export default Input