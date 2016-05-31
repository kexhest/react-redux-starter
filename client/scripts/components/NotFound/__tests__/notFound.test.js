import test from 'ava'

import React from 'react'
import { shallow } from 'enzyme'

import NotFound from '../NotFound'

let wrapper = null

test.beforeEach(() => {
  wrapper = shallow(<NotFound />)
})

test.afterEach(() => {
  wrapper = null
})

test('NotFound renders a div', t => {
  t.is(wrapper.type(), 'div')
})
