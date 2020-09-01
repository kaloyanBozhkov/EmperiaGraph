import React from 'react'
import PropTypes from 'prop-types'

import Loading from '~/components/UI/Loading/Loading'

const withLoading = ({ loadingMsg, modifier }) => WrappedComponent => ({ isLoading, ...otherProps }) => (isLoading ? 
    <Loading loadingMsg={loadingMsg} modifier={modifier} />
   : 
    <WrappedComponent  {...otherProps}/>
)


withLoading.propTypes = {
    loadingMsg: PropTypes.string
}

export default withLoading
