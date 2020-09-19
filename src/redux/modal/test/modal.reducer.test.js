import modalReducer from '~/redux/modal/modal.reducer'
import { OPEN_MODAL, CLOSE_MODAL } from '~/redux/modal/modal.constants'

describe('testing self exclusion reducer', () => {
  const initialState = {
    modal: null,
    data: null,
  }

  it('should return initial state', () => {
    expect(modalReducer(undefined)).toEqual(initialState)
  })

  it('should set state for opened modal', () => {
    const action = {
      type: OPEN_MODAL,
      payload: {
        modal: 'ErrorModal',
        data: {
          modalLabel: 'Ooops!',
          someProperty: 1,
        },
      },
    }

    expect(modalReducer(initialState, action)).toEqual({
      ...initialState,
      modal: action.payload.modal,
      data: action.payload.data,
    })
  })

  it('should set state for closed modal', () => {
    const action = {
      type: CLOSE_MODAL,
    }

    expect(modalReducer(initialState, action)).toEqual(initialState)
  })
})
