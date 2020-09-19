import { OPEN_MODAL, CLOSE_MODAL } from './modal.constants'

const initialState = {
  modal: null,
  data: null,
}

const openModal = (state, { modal, data }) => {
  return {
    modal,
    data,
  }
}

const closeModal = () => initialState

const modalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_MODAL:
      return openModal(state, action.payload)
    case CLOSE_MODAL:
      return closeModal()
    default:
      return state
  }
}

export default modalReducer
