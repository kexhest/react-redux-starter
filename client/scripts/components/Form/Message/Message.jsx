import './message.scss'

import React, { PropTypes } from 'react'

/**
 * This is the Message component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const Message = ({ className, message, onClick }) =>
  <p onClick={onClick} className={className}>{message}</p>

/**
 * Declare expected property types.
 */
Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClick: PropTypes.func
}

/**
 * Set default properties.
 */
Message.defaultProps = {
  onClick: () => {}
}

export default Message
