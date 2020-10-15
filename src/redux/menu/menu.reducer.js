import { TOGGLE_MENU } from './menu.constants'

const initialState = {
    active: true
}

const onToggle = (state, mode) => ({ ...state, active: mode })

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return onToggle(state, action.payload)
        default:
            return state
    }
}

export default menuReducer