import React from 'react'
import { shallow, mount } from 'enzyme'
import { Modal } from '../Modal'

describe('testing modal', () => {
  it('should render modal', () => {
    const modal = shallow(<Modal modal="someUnhandledModal" />)
    expect(modal).toMatchSnapshot()
  })
  it('should fire close fn on cose icon click', () => {
    const fn = jest.fn(() => 1)
    const modal = shallow(<Modal modal="someUnhandledModal" onCloseModal={fn} />)
    modal.find('.close').at(0).simulate('click')
    expect(fn).toHaveBeenCalled()
  })
  it('should render modal with defalt "modal is empty" msg if modal name provided is not handled', () => {
    const modal = shallow(<Modal modal="unhandledModalName" />)

    expect(modal.find('.box p').at(0).html()).toEqual('<p>Modal is empty, not configured!</p>')
  })
  it('should return null if modal not specified', () => {
    const modal2 = shallow(<Modal modal={null} />)
    expect(modal2).toEqual({})
  })
  it('should render cofirm password modal with expected contents and pass them the expected props', () => {
    const props = {
      text: 'hello world',
    }
    const modal = shallow(<Modal data={props} modal="confirmPassword" />)
    expect(modal).toMatchSnapshot()
    expect(modal.find('ConfirmPassword').prop('text')).toEqual('hello world')
  })

  it('should close modal when pressed esc', () => {
    const closeFn = jest.fn()

    // obj to keep track of eventlisteners
    const map = {}

    // replace addEventListener with jest fn
    document.addEventListener = jest.fn((event, cb) => {
      
      // keep ref to event
      map[event] = cb
    })

    const modal = mount(<Modal modal="someModalName" onCloseModal={closeFn} />)

    // simulate keypress
    map.keydown({ key: 'Escape'})

    expect(closeFn).toHaveBeenCalled()
  })
})
