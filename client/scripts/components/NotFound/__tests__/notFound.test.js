import test from 'ava'

import React from 'react'
import { shallow } from 'enzyme'

import NotFound from '../NotFound'

test('NotFound renders a div', t => {
  const wrapper = shallow(<NotFound />)

  t.is(wrapper.type(), 'div')
})
