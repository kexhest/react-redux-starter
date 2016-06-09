import test from 'ava'

import React from 'react'
import { shallow } from 'enzyme'

import { App } from '../App'

test('App renders a div', t => {
  const wrapper = shallow(<App />)

  t.is(wrapper.type(), 'div')
})
