import { connect } from 'react-redux'
import { compose } from 'redux'

import { requestFormattedDataStart, requestFormattedDataFail, requestFormattedDataSuccess } from '~/redux/request/request.actions'
import { onToggleMenu } from '~/redux/menu/menu.actions'

import Main from '~/pages/Main'

import withLoading from '~/hoc/withPageLoading'
import withDispatch from '~/hoc/withDispatch'
import withError from '~/hoc/withError'

import RequestError from '~/components/RequestError/RequestError'

const mapStateToProps = (state) => ({
  isLoading: state.requestReducer.isPending === 'get',
  error: state.requestReducer.error,
  activeMenu: state.menuReducer.active,
})

const mapDispatchToProps = (dispatch) => ({
  onToggleMenu: (state) => dispatch(onToggleMenu(state))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDispatch(requestFormattedDataStart({
    requestConfig: { method: 'GET', endpoint: 'data' }, 
    successCallback: requestFormattedDataSuccess,
    failCallback: requestFormattedDataFail
  })),
  withLoading({ loadingMsg: 'Fetching data from server..', modifier: 'absolutelyPositioned' }),
  withError(RequestError)
)(Main)
