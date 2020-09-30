import { connect } from 'react-redux'

import { closeModal } from '~/redux/modal/modal.actions'

import Modal from '~/components/Modal/Modal'

const mapStateToProps = (state) => ({
    modal: state.modalReducer.modal,
    data: state.modalReducer.data,
    error: state.modalReducer.error,
})

const mapDispatchToProps = (dispatch) => ({
    onCloseModal: () => dispatch(closeModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
