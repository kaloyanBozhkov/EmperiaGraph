import React from 'react'

// Load styles
import styles from './styles.module.scss'

const RequestError = ({ error = 'Request failed' }) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.logo}>
                <h2>EmperiaGraph</h2>
                <p>v0.0.1</p>
            </div>
            <div className={styles.content}>
                <p>
                    Unable to complete the request, please reload the page and try again.
                    <br />
                    If the error persist please raise the issue with koko-desu.
                </p>
                <h2>ERROR: <span>{error}</span>.</h2>
            </div>
        </div>
    )
}

export default RequestError