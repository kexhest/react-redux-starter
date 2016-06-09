import test from 'ava'

import React from 'react'
import { shallow } from 'enzyme'

import Login from '../Login'

import Form from 'components/Form/Form'

test('Login renders a login form', t => {
  const wrapper = shallow(<Login />)

  t.is(wrapper.find(Form).length, 1)
})
