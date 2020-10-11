import React from 'react'

// Load component
import Overlay from 'UI/Overlay/Overlay'

const withComponentLoading = (WrappedComponent) => {
  const LoadingOverlay = ({ isLoading, loadingMsg, ...otherProps }) => {
    return isLoading ? (
      <Overlay loadingMsg={loadingMsg}>
        <WrappedComponent {...otherProps} />
      </Overlay>
    ) : (
        <WrappedComponent {...otherProps} />
      )
  }
  return LoadingOverlay
}

export default withComponentLoading
