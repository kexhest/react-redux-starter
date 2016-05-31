import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Form from '../Form'

import Field from '../Field/Field'

const props = {
  legend: 'test form',
  fields: [
    {
      type: 'text',
      name: 'test',
      label: 'test field',
      value: 'value1',
      placeholder: 'Write something',
      required: true,
      error: false
    },
    {
      type: 'select',
      name: 'test2',
      label: 'test field',
      value: 'value2',
      placeholder: 'Select something',
      options: [{
        text: 'something',
        value: 'something'
      }],
      required: false,
      error: false
    },
    {
      type: 'password',
      name: 'password-field1',
      label: 'password-label',
      value: 'abc',
      required: false
    },
    {
      type: 'password',
      name: 'password-field2',
      label: 'password-label',
      value: 'abc',
      required: false,
      confirm: 'password-field1'
    }
  ],
  submitText: 'submit test',
  messages: {
    email: 'Not a valid email',
    tel: 'Not a valid phone number.',
    required: 'This field is required.',
    confirm: 'The value must match [label]'
  },
  sending: false,
  errors: {},
  onSubmit: sinon.spy()
}

let wrapper = null
let component = null

test.beforeEach(() => {
  wrapper = shallow(<Form {...props} />)
  component = wrapper.instance()

  sinon.spy(component, 'validate')
  sinon.spy(component, 'setError')
  sinon.spy(component, 'setFieldStatus')
})

test.afterEach(() => {
  props.onSubmit.reset()

  wrapper = null
  component = null
})

test('Form renders as a form element', t => {
  t.is(wrapper.type(), 'form')
})

test('Form renders a legend with text that matches props', t => {
  t.is(wrapper.find('legend').length, 1)
  t.is(wrapper.find('legend').first().text(), props.legend)
})

test('Form does not render any legend if it is omitted from props', t => {
  const noLegend = { ...props }
  delete noLegend.legend

  wrapper = shallow(<Form {...noLegend} />)
  t.is(wrapper.find('legend').length, 0)
})

test('Form renders the same ammount of fields as specified in props', t => {
  t.is(wrapper.find(Field).length, props.fields.length)
})

test('Form calls props.onSubmit when the form is submitted', t => {
  wrapper.simulate('submit')

  t.true(props.onSubmit.calledOnce)
})

test('Form does not call props.onSubmit if props.sending is true', t => {
  wrapper.setProps({ sending: true })
  wrapper.update()

  component.onSubmit()

  t.true(props.onSubmit.notCalled)
})

test('Form does not call props.onSubmit if there is an error in state.error', t => {
  wrapper = shallow(
    <Form
      url={'/success'}
      fields={[
        {
          type: 'text',
          name: 'name',
          value: '',
          required: true
        }
      ]}
    />
  )
  component = wrapper.instance()

  component.onSubmit()

  t.true(props.onSubmit.notCalled)
})

test('Form calls props.onSubmit with data if not props.sending and no state.error', t => {
  component.onSubmit()

  t.true(props.onSubmit.calledWith({
    [props.fields[0].name]: props.fields[0].value,
    [props.fields[1].name]: props.fields[1].value,
    [props.fields[2].name]: props.fields[2].value,
    [props.fields[3].name]: props.fields[3].value
  }))
})

test('Form:setError updates state.errors', t => {
  const errorMessage = 'some message'

  component.setError({ select: false })

  t.is(wrapper.state('error').select, undefined)

  component.setError({ select: errorMessage })

  t.is(wrapper.state('error').select, errorMessage)
})

test('Form:setFieldStatus updates values in state.form', t => {
  const name = props.fields[0].name
  const value = 'some value'

  t.is(wrapper.state('form')[name].value, props.fields[0].value)

  component.setFieldStatus(name, value, false)

  t.is(wrapper.state('form')[name].value, value)
})

test('Form:setFieldStatus updates errors and validity in state.errors and state.form on error', t => {
  const name = props.fields[0].name
  const value = 'some value'
  const errorMessage = 'some error message'

  component.setFieldStatus(name, value, false)

  t.falsy(wrapper.state('error')[name])
  t.true(wrapper.state('form')[name].valid)

  component.setFieldStatus(name, '', errorMessage)

  t.is(wrapper.state('error')[name], errorMessage)
  t.false(wrapper.state('form')[name].valid)
})

test('Form:reset resets all form values', t => {
  t.is(wrapper.state('form').test.value, props.fields[0].value)
  t.is(wrapper.state('form').test2.value, props.fields[1].value)

  component.reset()

  t.is(wrapper.state('form').test.value, '')
  t.is(wrapper.state('form').test2.value, '')
})

test('Form:validate returns false and calls Form:setFieldStatus with error if required field has no value', t => {
  const field = {
    name: 'text-field',
    label: 'text-label',
    value: ' ',
    required: true
  }

  const messages = {
    required: 'EEEEEE'
  }

  wrapper = shallow(<Form {...{ ...props, fields: [field], messages }} />)
  component = wrapper.instance()
  sinon.spy(component, 'setFieldStatus')

  const { name, label, value, required } = field

  t.false(component.validate(name, label, value, required))
  t.true(component.setFieldStatus.calledWith(name, value, messages.required))
})

test('Form:validate returns true and calls Form:setFieldStatus without error if value is not required', t => {
  const field = {
    name: 'text-field',
    label: 'text-label',
    value: '',
    required: false
  }

  wrapper = shallow(<Form {...{ ...props, fields: [field] }} />)
  component = wrapper.instance()
  sinon.spy(component, 'setFieldStatus')

  const { name, label, value, required } = field

  t.true(component.validate(name, label, value, required))
  t.true(component.setFieldStatus.calledWith(name, value, false))
})


test('Form:validate returns false and calls Form:setFieldStatus with error if value does not match constraints', t => {
  const field = {
    name: 'email',
    label: 'text-label',
    value: 'asdsa',
    required: false,
    constraints: [
      '^([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-',
      '\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-',
      '\\x7f])*\\x22)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\',
      'x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-',
      '\\xff]|\\x5c[\\x00-\\x7f])*\\x22))*\\x40([^\\x00-\\x20\\x22\\x28\\x',
      '29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^',
      '\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d)(\\x2e([^\\x',
      '00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d',
      '\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7',
      'f])*\\x5d))*$'
    ].join('')
  }

  const messages = {
    email: 'EEEEEE'
  }

  wrapper = shallow(<Form {...{ ...props, fields: [field], messages }} />)
  component = wrapper.instance()
  sinon.spy(component, 'setFieldStatus')

  const { name, label, value, required, constraints } = field

  t.false(component.validate(name, label, value, required, constraints))
  t.true(component.setFieldStatus.calledWith(name, value, messages.email))
})

test('Form:validate returns true and calls Form:setFieldStatus without error if value matches constraints', t => {
  const field = {
    name: 'email',
    label: 'text-label',
    value: 'an@email.com',
    required: false,
    constraints: [
      '^([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-',
      '\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-',
      '\\x7f])*\\x22)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\',
      'x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-',
      '\\xff]|\\x5c[\\x00-\\x7f])*\\x22))*\\x40([^\\x00-\\x20\\x22\\x28\\x',
      '29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^',
      '\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d)(\\x2e([^\\x',
      '00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d',
      '\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7',
      'f])*\\x5d))*$'
    ].join('')
  }

  const messages = {
    email: 'EEEEEE'
  }

  wrapper = shallow(<Form {...{ ...props, fields: [field], messages }} />)
  component = wrapper.instance()
  sinon.spy(component, 'setFieldStatus')

  const { name, label, value, required, constraints } = field

  t.true(component.validate(name, label, value, required, constraints))
  t.true(component.setFieldStatus.calledWith(name, value, false))
})

test('Form:validate returns false and calls Form:setFieldStatus with error if value does not match the confirm-field value', t => {
  const fields = [
    {
      name: 'text',
      value: 'abcd',
      confirm: 'text2'
    },
    {
      name: 'text2',
      value: 'abc'
    }
  ]

  const messages = {
    confirm: 'EEEEEE'
  }

  wrapper = shallow(<Form {...{ ...props, fields, messages }} />)
  component = wrapper.instance()
  sinon.spy(component, 'setFieldStatus')

  const { name, label, value, required, constraints, confirm } = fields[0]

  t.false(component.validate(name, label, value, required, constraints, confirm))
  t.true(component.setFieldStatus.calledWith(name, value, messages.confirm))
})

test('Form:validate returns true and calls Form:setFieldStatus without error if value matches confirm-field value', t => {
  const fields = [
    {
      name: 'text',
      value: 'abcd',
      confirm: 'text2'
    },
    {
      name: 'text2',
      value: 'abcd'
    }
  ]

  wrapper = shallow(<Form {...{ ...props, fields }} />)
  component = wrapper.instance()
  sinon.spy(component, 'setFieldStatus')

  const { name, label, value, required, constraints, confirm } = fields[0]

  t.true(component.validate(name, label, value, required, constraints, confirm))
  t.true(component.setFieldStatus.calledWith(name, value, false))
})
