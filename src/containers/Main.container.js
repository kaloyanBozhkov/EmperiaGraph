import { connect } from 'react-redux'
import { compose } from 'redux'

import Main from '~/pages/Main'

import withLoading from '~/hoc/withPageLoading'
import withDispatch from '~/hoc/withDispatch'
import { requestFormattedDataStart, requestFormattedDataFail, requestFormattedDataSuccess } from '~/redux/request/request.actions'

const mapStateToProps = (state) => ({
  isLoading: state.requestReducer.isPending === 'get',
})

export default compose(
  connect(mapStateToProps),
  withDispatch(requestFormattedDataStart({
    requestConfig: { method: 'GET', endpoint: 'data' }, 
    successCallback: requestFormattedDataSuccess,
    failCallback: requestFormattedDataFail
  })),
  withLoading({ loadingMsg: 'Fetching data from server..', modifier: 'absolutelyPositioned' }),
)(Main)
