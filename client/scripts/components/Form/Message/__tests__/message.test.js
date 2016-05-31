import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Message from '../Message'

const props = {
  className: 'some-class',
  message: 'some message',
  onClick: sinon.spy()
}

let wrapper = null

test.beforeEach(t => {
  wrapper = shallow(<Message {...props} />)
})

test.afterEach(t => {
  props.onClick.reset()

  wrapper = null
})

test('Message renders a <p> tag with class and message from props', t => {
  t.is(wrapper.type(), 'p')

  t.true(wrapper.hasClass(props.className))
  t.is(wrapper.text(), props.message)
})

test('Message takes any function and calls it _once_ when the message is clicked', t => {
  wrapper.simulate('click')

  t.true(props.onClick.calledOnce)
})
