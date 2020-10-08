import { useReducer } from 'react'

/**
 * @param  {object} initialState => object with property for each Input atom to hold a state for. e.g. { firsName: '', lastName: '' ...}, returned reducer will be obj.firsName, obj.lastName etc..
 */
const useInputHandler = (initialState) => {
      // state for controlled form components. Initial state is object with a property for each Input atom
      const [reducer, setReducer] = useReducer((state, newValue) => ({ ...state, ...newValue }), initialState)

      // onChange handler for all the controlled Input components
      const onInputChangeHandler = ({ target }, ...otherArgs) => {

            // invalid target obj
            if (!target) return

            // @TODO add date and other unique input types
            switch (target.type) {
                  case 'checkbox':
                        setReducer({ [target.name]: target.checked })
                        break
                  case 'date':
                        setReducer({ [target.name]: otherArgs[0] })
                        break
                  default:
                        setReducer({ [target.name]: target.value })
            }
      }

      // Give option to pass obj with new property values for state, to change bulk
      const setEntireState = (newState) => setReducer(newState)

      // return the current values of Input atoms, and the onChange event handler
      return [reducer, onInputChangeHandler, setEntireState]
}

export default useInputHandler
