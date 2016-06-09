import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Text from '../Text'

const props = {
  type: 'text',
  name: 'test',
  placeholder: 'Write something',
  value: 'test',
  required: true,
  error: false,
  onFocus: sinon.spy(),
  onBlur: sinon.spy(),
  onChange: sinon.spy()
}

test.afterEach(() => {
  props.onFocus.reset()
  props.onBlur.reset()
  props.onChange.reset()
})

test('Text renders an input field with attributes from props', t => {
  const wrapper = shallow(<Text {...props} />)
  const input = wrapper.find('input')

  t.is(input.length, 1)

  t.is(input.prop('type'), props.type)
  t.is(input.prop('name'), props.name)
  t.is(input.prop('placeholder'), props.placeholder)
  t.is(input.prop('value'), props.value)
  t.is(input.prop('required'), props.required)
})

test('Text calls props.onChange when the value is changed', t => {
  const wrapper = shallow(<Text {...props} />)
  wrapper.find('input').simulate('change')

  t.true(props.onChange.calledOnce)
})

test('Text calls props.onFocus when the input is focused', t => {
  const wrapper = shallow(<Text {...props} />)
  wrapper.find('input').simulate('focus')

  t.true(props.onFocus.calledOnce)
})

test('Text calls props.onBlur when the input is blurred', t => {
  const wrapper = shallow(<Text {...props} />)
  wrapper.find('input').simulate('blur')

  t.true(props.onBlur.calledOnce)
})

test('Text renders without error class if props.error is false', t => {
  const wrapper = shallow(<Text {...props} />)
  t.false(wrapper.find('input').hasClass('error'))
})

test('Text renders with error class if props.error is true', t => {
  const errorProps = { ...props, error: true }
  const wrapper = shallow(<Text {...errorProps} />)

  t.true(wrapper.find('input').hasClass('error'))
})
