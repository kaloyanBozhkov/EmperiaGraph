import React from 'react'

const withError = (ErrorComponent) => (WrappedComponent) => ({ error, ...otherProps }) => (
    error ? (
        <ErrorComponent error={error} />
    ) : (
        <WrappedComponent {...otherProps} />
    )
)

export default withError