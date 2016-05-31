import React, { PropTypes } from 'react'

/**
 * This is the Arrow component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const Arrow = ({ style, className }) =>
  <svg style={style} className={className} viewBox='0 0 23.8 12.9'>
    <path
      d={[
        'M22.8,12.9c-0.3,0-0.5-0.1-0.7-0.3L11.9,2.4L1.7,12.6c-0.4,0.4-1,0.4-1.4,',
        '0s-0.4-1,0-1.4L11.2,0.3c0.4-0.4,1-0.4,1.4,0l10.9,10.9c0.4,0.4,0.4,1,0,',
        '1.4C23.3,12.8,23,12.9,22.8,12.9z'
      ].join('')}
    />
  </svg>

/**
 * Declare expected property types.
 */
Arrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default Arrow
