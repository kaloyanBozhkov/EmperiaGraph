import React from 'react'
import Main from '~/containers/Main.container'
import { Modal } from './components/Modal/Modal'
import { connect } from 'react-redux'
import { closeModal } from './redux/modal/modal.actions'

function App({ ...modalProps }) {
  return (
    <div className="App">
      <Modal {...modalProps} />
      <Main />
    </div>
  )
}



const mapStateToProps = (state) => ({
  modalProps: {
    modal: state.modalReducer.modal,
    data: state.modalReducer.data
  }
})

const mapDispatchToProps = (dispatch) => ({
  onCloseModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
