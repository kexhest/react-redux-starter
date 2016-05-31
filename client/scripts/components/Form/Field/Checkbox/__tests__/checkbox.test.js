import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Checkbox from '../Checkbox'

const props = {
  name: 'test',
  value: false,
  error: false,
  required: true,
  onChange: sinon.spy()
}

let wrapper = null

test.beforeEach(() => {
  wrapper = shallow(<Checkbox {...props} />)
})

test.afterEach(() => {
  props.onChange.reset()

  wrapper = null
})

test('Checkbox renders an input field with attributes from props', t => {
  const input = wrapper.find('input')

  t.is(input.length, 1)

  t.is(input.prop('name'), props.name)
  t.is(input.prop('checked'), props.value)
  t.is(input.prop('required'), props.required)
})

test('Checkbox calls props.onChange when the value is changed', t => {
  const input = wrapper.find('input')

  input.simulate('change')

  t.true(props.onChange.calledOnce)
})

test('Checkbox renders without error class if props.error is false', t => {
  t.false(wrapper.hasClass('error'))
})

test('Checkbox renders with error class if props.error is true', t => {
  const errorProps = { ...props, error: true }

  wrapper = shallow(<Checkbox {...errorProps} />)

  t.true(wrapper.hasClass('error'))
})
