import './checkbox.scss'

import React, { PropTypes } from 'react'
import classNames from 'classnames'

/**
 * This is the Checkbox component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const Checkbox = ({ name, value, required, error, onChange }) =>
  <div className={classNames('form-checkbox', { error })}>
    <input
      type='checkbox'
      {...{
        name,
        required,
        onChange
      }}
      checked={value}
    />
    <span></span>
  </div>

/**
 * Declare expected property types.
 */
Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  onChange: PropTypes.func
}

/**
 * Set default properties.
 */
Checkbox.defaultProps = {
  onChange: () => {}
}

export default Checkbox
