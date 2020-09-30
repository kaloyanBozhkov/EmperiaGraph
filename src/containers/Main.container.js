import { connect } from 'react-redux'
import { compose } from 'redux'

import Main from '~/pages/Main'

import { requestDataStart } from '~/redux/data/data.actions'

import withLoading from '~/hoc/withPageLoading'
import withDispatch from '~/hoc/withDispatch'

const mapStateToProps = (state) => ({
  isLoading: state.dataReducer.isPending,
})

export default compose(
  connect(mapStateToProps),
  withDispatch(requestDataStart()),
  withLoading({ loadingMsg: 'Fetching data from server..', modifier: 'absolutelyPositioned' }),
)(Main)
