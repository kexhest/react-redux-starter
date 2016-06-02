import './field.scss'

import React, { PropTypes, Component } from 'react'
import isEqual from 'lodash/isEqual'
import classNames from 'classnames'

import Checkbox from './Checkbox/Checkbox'
import Text from './Text/Text'
import Select from './Select/Select'

import Message from '../Message/Message'

/**
 * This is the Field component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Field extends Component {

  /**
   * Create Field and set initial state.
   *
   * @param {object} props
   *
   * @return void
   */
  constructor (props) {
    super(props)

    this.state = {
      focus: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
    this.onBlurHandler = this.onBlurHandler.bind(this)
  }

  /**
   * Prevent component from doing unnecessary re-renders.
   *
   * @param {object} nextProps
   * @param {object} nextState
   *
   * @return {bool}
   */
  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
  }

  /**
   * Event handler that passes values to parent component.
   *
   * @param {object} e
   *
   * @return void
   */
  onChangeHandler (e) {
    const { type, name, label, required, constraints, confirm, validate } = this.props
    const value = type === 'checkbox' ? e.target.checked : e.target.value

    validate(name, label, value, required, constraints, confirm)
  }

  /**
   * Event handler for when the input gains focus.
   *
   * @return void
   */
  onFocusHandler () {
    this.setState({ focus: true })
  }

  /**
   * Event handler for when the input looses focus.
   *
   * @return void
   */
  onBlurHandler () {
    const { name, label, value, required, constraints, confirm, validate } = this.props

    this.setState({ focus: false })

    validate(name, label, value, required, constraints, confirm)
  }

  /**
   * Render field based on type.
   *
   * @return {object}
   */
  createField () {
    const { focus } = this.state

    const {
      type,
      name,
      label,
      placeholder,
      value,
      required,
      options,
      error
    } = this.props

    let field = null

    switch (type) {
      case 'checkbox':
      case 'radio':
        field = (
          <Checkbox
            {...{
              name,
              label,
              value: !!value,
              required,
              error: !!error,
              onChange: this.onChangeHandler
            }}
          />
        )
        break

      case 'select':
        field = (
          <Select
            {...{
              name,
              label,
              placeholder,
              value,
              required,
              options,
              error: !!error && !focus,
              onFocus: this.onFocusHandler,
              onBlur: this.onBlurHandler,
              onChange: this.onChangeHandler
            }}
          />
        )
        break

      case 'text':
      case 'tel':
      case 'email':
      case 'password':
        field = (
          <Text
            {...{
              type,
              name,
              label,
              placeholder,
              value,
              required,
              error: !!error && !focus,
              onFocus: this.onFocusHandler,
              onBlur: this.onBlurHandler,
              onChange: this.onChangeHandler
            }}
          />
        )
        break

      default:
        // no-op
    }

    return field
  }

  /**
   * Render react component.
   *
   * @return {object}
   */
  render () {
    const { focus } = this.state
    const { error, value, label } = this.props

    let errorMessage = null

    if (error && !focus) {
      errorMessage = <Message className='error-message' message={error} />
    }

    return (
      <div className='form-field'>
        <label className={classNames('form-label', { focus, value })}>
          <p>{label}</p>
          {this.createField()}
        </label>
        {errorMessage}
      </div>
    )
  }
}

/**
 * Declare expected property types.
 */
Field.propTypes = {
  type: PropTypes.oneOf(['select', 'text', 'email', 'password', 'tel', 'checkbox', 'radio']),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  required: PropTypes.bool,
  confirm: PropTypes.string,
  constraints: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    })
  ),
  error: PropTypes.string,
  validate: PropTypes.func
}

/**
 * Set default properties.
 */
Field.defaultProps = {
  validate: () => {}
}
