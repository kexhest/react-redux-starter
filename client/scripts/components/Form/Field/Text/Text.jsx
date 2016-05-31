import './text.scss'

import React, { PropTypes } from 'react'
import classNames from 'classnames'

/**
 * This is the Text component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const Text = (props) =>
  <div className='form-text'>
    <input className={classNames({ error: props.error })} {...props} />
  </div>

/**
 * Declare expected property types.
 */
Text.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel']),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
}

/**
 * Set default properties.
 */
Text.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {}
}

export default Text
