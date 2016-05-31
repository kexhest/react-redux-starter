import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Select from '../Select'

const props = {
  name: 'select',
  placeholder: 'Select an option',
  value: '',
  required: true,
  options: [
    {
      title: 'one',
      value: 'one'
    },
    {
      title: 'two',
      value: 'two'
    }
  ],
  error: false,
  onFocus: sinon.spy(),
  onBlur: sinon.spy(),
  onChange: sinon.spy()
}

let wrapper = null

test.beforeEach(() => {
  wrapper = shallow(<Select {...props} />)
})

test.afterEach(() => {
  props.onFocus.reset()
  props.onBlur.reset()
  props.onChange.reset()

  wrapper = null
})

test('Select renders a select element with attributes', t => {
  const select = wrapper.find('select')

  t.is(select.length, 1)

  t.is(select.prop('name'), props.name)
  t.is(select.prop('value'), props.value)
  t.is(select.prop('required'), props.required)
})

test('Select renders a disabled option as placeholder', t => {
  const placeholder = wrapper.find('option').first()

  t.true(placeholder.prop('disabled'))
  t.is(placeholder.text(), props.placeholder)
})

test('Select renders equal ammount of options as defined in props', t => {
  const options = wrapper.find('option')

  const count = props.placeholder ? props.options.length + 1 : props.options.length

  t.is(options.length, count)
})

test('Select calls props.onChange when the value is changed', t => {
  wrapper.find('select').simulate('change')

  t.true(props.onChange.calledOnce)
})

test('Select calls props.onFocus when the select is focused', t => {
  wrapper.find('select').simulate('focus')

  t.true(props.onFocus.calledOnce)
})

test('Select calls props.onBlur when the select is blurred', t => {
  wrapper.find('select').simulate('blur')

  t.true(props.onBlur.calledOnce)
})

test('Select renders without error class if props.error is false', t => {
  t.false(wrapper.find('select').hasClass('error'))
})

test('Select renders with error class if props.error is true', t => {
  const errorProps = { ...props, error: true }
  wrapper = shallow(<Select {...errorProps} />)

  t.true(wrapper.find('select').hasClass('error'))
})
