import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const withDispatch = (actionObject) => WrappedComponent => (props) => {
    const dispatch = useDispatch()

    // Make request onMount
    useEffect(() => {
        dispatch(actionObject)
    }, [dispatch])

    return <WrappedComponent {...props} />
}

export default withDispatch