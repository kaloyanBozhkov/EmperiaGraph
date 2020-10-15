import {
    TOGGLE_MENU
} from './menu.constants'

export const onToggleMenu = (state) => ({
    type: TOGGLE_MENU,
    payload: state
})