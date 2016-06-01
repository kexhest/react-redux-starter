/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import './login.scss'

import React, { PropTypes } from 'react'

import Form from 'components/Form/Form'

/**
 * This is the Login component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const Login = ({ legend, fields, submitText, messages, error, sending, loginUser }) =>
  <Form
    {...{
      legend,
      fields,
      submitText,
      messages,
      error,
      sending
    }}
    onSubmit={loginUser}
  />

/**
 * Declare expected property types.
 */
Login.propTypes = {
  legend: PropTypes.string,
  fields: PropTypes.array,
  submitText: PropTypes.string,
  messages: PropTypes.array,
  error: PropTypes.object,
  sending: PropTypes.bool,
  loginUser: PropTypes.func
}

/**
 * Declare expected context types.
 */
Login.contextTypes = {}

/**
 * Set default properties.
 */
Login.defaultProps = {}

export default Login
