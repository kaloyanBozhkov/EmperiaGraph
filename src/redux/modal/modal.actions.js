import { OPEN_MODAL, CLOSE_MODAL } from './modal.constants'
/**
 * @param  {string} modal
 * @param  {*} data -> any callback or data to pass
 */
export const openModal = (modal, data) => ({
  type: OPEN_MODAL,
  payload: {
    modal,
    data,
  },
})
/**
 * @param  {string} modalToClose
 * @param  {*} data -> any callback or data to pass
 */
export const closeModal = (modalToClose) => ({
  type: CLOSE_MODAL,
  payload: modalToClose,
})
