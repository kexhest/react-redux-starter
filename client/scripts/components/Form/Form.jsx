import './form.scss'

import React, { Component, PropTypes } from 'react'
import update from 'react-addons-update'
import classNames from 'classnames'
import { find } from 'lodash/collection'
import { isEqual } from 'lodash/lang'

import Field from './Field/Field'
import SubmitButton from './SubmitButton/SubmitButton'
import Message from './Message/Message'

/**
 * This is the Form component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Form extends Component {

  /**
   * Create Form and set initial state.
   *
   * @param {object} props
   *
   * @return {void}
   */
  constructor (props) {
    super(props)

    const form = {}
    const error = {}

    this.state = {
      form,
      error
    }

    this.reset = this.reset.bind(this)
    this.validate = this.validate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    props.fields.forEach(field => {
      this.state.form[field.name] = {
        type: field.type,
        value: field.value || '',
        valid: false
      }
    })

    if (props.error) this.state.error = props.error
  }

  /**
   * React component lifecycle method that is triggered when the component
   * receives new props.
   *
   * @param {object} nextProps
   *
   * @return {void}
   */
  componentWillReceiveProps (nextProps) {
    const { fields, error } = this.props

    if (nextProps.error) this.setError(nextProps.error)
    if (error && !nextProps.error) this.setError({ message: false })

    if (!isEqual(nextProps.fields, fields)) {
      nextProps.fields.forEach(field => {
        if (field.value) {
          this.validate(
            field.name,
            field.label,
            field.value,
            field.required,
            field.constraints,
            field.confirm
          )
        }
      })
    }
  }

  /**
   * Event handler that handles for submit.
   *
   * @param {object} e
   *
   * @return {void}
   */
  onSubmit (e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    const { fields, onSubmit, sending } = this.props
    const { form } = this.state

    if (sending) return

    const data = {}
    let error = false
    let errors = 0

    fields.forEach(field => {
      const { name, label, required, constraints, confirm } = field

      error = !this.validate(name, label, form[name].value, required, constraints, confirm)

      if (error) errors++

      data[name] = form[name].value
    })

    if (errors > 0) return

    onSubmit(data)
  }

  /**
   * Set error.
   *
   * @param {object} newError
   *
   * @return {void}
   */
  setError (newError) {
    const { error } = this.state

    Object.keys(newError).forEach(err => {
      // Iterate over error within newError.
      if (!newError[err]) {
        // New error value is falsy, remove error from error.
        delete error[err]
      } else {
        // Set value from new error to error.
        error[err] = newError[err]
      }
    })

    this.setState(error)
  }

  /**
   * Set field status.
   *
   * @param {string} name
   * @param {string|number|bool} value
   * @param {string} err
   */
  setFieldStatus (name, value, err) {
    const { form, error } = this.state

    if (!err && error[name]) {
      delete error[name]
    } else {
      error[name] = err
    }

    this.setState({
      form: update(form, {
        [name]: {
          value: { $set: value },
          valid: { $set: !err }
        }
      }),
      error
    })
  }

  /**
   * Reset form values and success message.
   *
   * @return {void}
   */
  reset (e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    const { form } = this.state

    Object.keys(form).forEach(field => {
      form[field] = {
        ...form[field],
        value: '',
        valid: false
      }
    })

    this.setState({
      form,
      error: {}
    })
  }

  /**
   * Validate email using RFC2822 standard regex validation.
   * Validate tel as a string with 8 digits starting with 4 or 9.
   * Validate text as a string which is not empty or only whitespace.
   *
   * @param {string} name
   * @param {string} label
   * @param {string} value
   * @param {bool} required
   * @param {string} constraints
   * @param {string} confirm
   *
   * @return {boolean}
   */
  validate (name, label, value, required, constraints, confirm) {
    const { messages } = this.props
    const { form } = this.state

    let err = false
    let msg = null
    const val = typeof value === 'string' ? value.trim() : !!value

    if (!val && required) {
      msg = messages.required || 'Error message missing for [required].'
      err = msg.replace('[label]',
        label ? label.toLowerCase() : '')
    }

    if (val && constraints && !err) {
      const pattern = new RegExp(constraints)

      msg = messages[name] || `Error message missing for [${name}].`

      // Assign message to err only if message exists and the test returns false.
      // If test returns true or message doesn't exist, error will be false.
      err = !pattern.test(val) && msg
    }

    if (!err && val && confirm) {
      if (val !== form[confirm].value) {
        msg = messages.confirm || 'Error message missing for [confirm].'
        err = label ? msg.replace('[label]', label.toLowerCase()) : msg
      }
    }

    this.setFieldStatus(name, value, err)

    return !err
  }

  /**
   * Render react component.
   *
   * @return {object}
   */
  render () {
    const { legend, fields, submitText, sending } = this.props
    const { form, error } = this.state

    let legendEl = null

    if (legend) {
      legendEl = <legend>{legend}</legend>
    }

    let errorMessage = null

    if (error.message) {
      errorMessage = (
        <Message
          className='error-message'
          message={error.message}
        />
      )
    }

    const invalid = !!find(form, { valid: false })

    return (
      <form
        className={classNames('form', { invalid, sending })}
        onSubmit={this.onSubmit}
        noValidate
      >
        <fieldset>
          {legendEl}
          {fields.map((field, i) =>
            <Field
              key={i}
              {...field}
              value={form[field.name].value}
              error={error[field.name] || ''}
              validate={this.validate}
            />
          )}

          {errorMessage}

          <SubmitButton
            sending={sending}
            invalid={invalid}
            action={this.onSubmit}
            text={submitText}
          />
        </fieldset>
      </form>
    )
  }
}

/**
 * Declare expected property types.
 */
Form.propTypes = {
  legend: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['select', 'text', 'email', 'password', 'tel', 'checkbox', 'radio']),
      name: PropTypes.string,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      required: PropTypes.bool,
      confirm: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
        })
      )
    })
  ),
  submitText: PropTypes.string,
  messages: PropTypes.objectOf(PropTypes.string),
  error: PropTypes.object,
  sending: PropTypes.bool,
  onSubmit: PropTypes.func
}

/**
 * Set default properties.
 */
Form.defaultProps = {
  submitText: 'send',
  messages: {
    required: 'This field is required'
  },
  onSubmit: () => {}
}
