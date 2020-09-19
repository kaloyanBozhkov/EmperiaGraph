import { OPEN_MODAL, CLOSE_MODAL } from '~/redux/modal/modal.constants'
import { openModal, closeModal } from '~/redux/modal/modal.actions'

describe('testing action object creators for modal', () => {
  it('should return open modal action object', () => {
    const config = {
      modal: 'someModal',
      data: {
        someParameter: 1,
      },
    }
    const expected = {
      type: OPEN_MODAL,
      payload: config,
    }

    expect(openModal(config.modal, config.data)).toEqual(expected)
  })

  it('should return close modal action object', () => {
    const expected = {
      type: CLOSE_MODAL,
    }

    expect(closeModal()).toEqual(expected)
  })
})
