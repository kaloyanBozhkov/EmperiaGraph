import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header'

describe('tesitng header', () => {
  it('should render header component', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  })
})
