import test from 'ava'

import React from 'react'
import { shallow } from 'enzyme'

import { App } from '../App'

let wrapper = null

test.beforeEach(() => {
  wrapper = shallow(<App />)
})

test.afterEach(() => {
  wrapper = null
})

test('App renders a div', t => {
  t.is(wrapper.type(), 'div')
})
