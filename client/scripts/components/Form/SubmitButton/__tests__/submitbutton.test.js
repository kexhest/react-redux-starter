import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import SubmitButton from '../SubmitButton'

const props = {
  sending: false,
  invalid: false,
  text: 'send me',
  onClick: sinon.spy()
}

test.afterEach(t => props.onClick.reset())

test('SubmitButton renders a <button type="submit"> with a text that matches props', t => {
  const wrapper = shallow(<SubmitButton {...props} />)
  t.is(wrapper.type(), 'button')
  t.is(wrapper.prop('type'), 'submit')

  t.is(wrapper.text(), props.text)
})

test('SubmitButton renders with a sending class when props.sending is true', t => {
  const sendingProps = { ...props, sending: true }
  const wrapper = shallow(<SubmitButton {...sendingProps} />)

  t.true(wrapper.hasClass('sending'))
})

test('SubmitButton has a disabled class when props.invalid is true', t => {
  const invalidProps = { ...props, invalid: true }
  const wrapper = shallow(<SubmitButton {...invalidProps} />)

  t.true(wrapper.hasClass('disabled'))
})

test('SubmitButton takes any function and calls it _once_ when the button is clicked', t => {
  const wrapper = shallow(<SubmitButton {...props} />)

  wrapper.simulate('click')

  t.true(props.onClick.calledOnce)
})
