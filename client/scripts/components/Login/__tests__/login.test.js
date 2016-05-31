import test from 'ava'

import React from 'react'
import { shallow } from 'enzyme'

import Login from '../Login'

import Form from 'components/Form/Form'

let wrapper = null

test.beforeEach(() => {
  wrapper = shallow(<Login />)
})

test.afterEach(() => {
  wrapper = null
})

test('Login renders a login form', t => {
  t.is(wrapper.find(Form).length, 1)
})
