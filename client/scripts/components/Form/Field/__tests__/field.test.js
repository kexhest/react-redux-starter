import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Field from '../Field'

import Text from '../Text/Text'
import Select from '../Select/Select'
import Checkbox from '../Checkbox/Checkbox'

const props = {
  type: 'text',
  name: 'test',
  label: 'test field',
  placeholder: 'Write something',
  value: '',
  required: true,
  confirm: '',
  constraints: '/./',
  options: [],
  error: '',
  validate: sinon.spy()
}

let wrapper = null

test.beforeEach(() => {
  wrapper = shallow(<Field {...props} />)
})

test.afterEach(() => {
  props.validate.reset()

  wrapper = null
})

test('Field renders as a div element', t => {
  t.is(wrapper.type(), 'div')
})

test('Field renders a label that matches the label prop', t => {
  t.is(wrapper.find('label').length, 1)

  t.is(wrapper.find('label p').text(), props.label)
})

test('Field renders correct child component based on type', t => {
  wrapper = shallow(<Field type='text' />)
  t.is(wrapper.find(Text).length, 1)
  t.not(wrapper.find(Select).length, 1)
  t.not(wrapper.find(Checkbox).length, 1)

  wrapper = shallow(<Field type='select' />)
  t.is(wrapper.find(Select).length, 1)
  t.not(wrapper.find(Text).length, 1)
  t.not(wrapper.find(Checkbox).length, 1)

  wrapper = shallow(<Field type='checkbox' />)
  t.is(wrapper.find(Checkbox).length, 1)
  t.not(wrapper.find(Text).length, 1)
  t.not(wrapper.find(Select).length, 1)
})

test('Field:onChangeHandler calls props.validate with args', t => {
  const value = 'some value'
  const { name, label, required, constraints, confirm } = props

  wrapper.instance().onChangeHandler({ target: { value } })

  t.true(props.validate.calledWith(name, label, value, required, constraints, confirm))
})

test('Field:onBlurHandler calls props.validate with args', t => {
  const { name, label, value, required, constraints, confirm } = props

  wrapper.instance().onBlurHandler()

  t.true(props.validate.calledWith(name, label, value, required, constraints, confirm))
})

test('Field errors are suppressed when focused', t => {
  wrapper = shallow(<Field type='text' error={'There was an error'} />)

  t.is(wrapper.state('focus'), false)
  t.is(wrapper.find('.error-message').length, 1)

  wrapper.instance().onFocusHandler()
  wrapper.update()

  t.is(wrapper.state('focus'), true)
  t.is(wrapper.find('.error-message').length, 0)
})

test('Field shows an error message if props.error is passed', t => {
  t.is(wrapper.find('.error-message').length, 0)

  const error = 'There was an error'
  wrapper = shallow(<Field type='text' error={error} />)
  t.is(wrapper.find('.error-message').length, 1)
  t.is(wrapper.find('.error-message').first().prop('message'), error)
})
