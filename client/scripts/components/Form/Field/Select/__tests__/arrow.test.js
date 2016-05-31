import test from 'ava'

import React from 'react'
import { shallow } from 'enzyme'

import Arrow from '../Arrow'

const props = {
  style: {
    fill: '#000',
    stroke: '#fff'
  },
  className: 'test-class'
}

test('Arrow renders a svg element with attributes from props', t => {
  const wrapper = shallow(<Arrow {...props} />)

  t.is(wrapper.type(), 'svg')

  t.deepEqual(wrapper.prop('style'), props.style)
  t.true(wrapper.hasClass(props.className))
})
