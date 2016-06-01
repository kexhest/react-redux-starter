/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import './not-found.scss'

import React from 'react'
import { Link } from 'react-router'

/**
 * This is the NotFound component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const NotFound = () =>
  <div className='not-found'>
    <Link to='/'>BUHUU.</Link>
  </div>

/**
 * Declare expected property types.
 */
NotFound.propTypes = {}

/**
 * Declare expected context types.
 */
NotFound.contextTypes = {}

/**
 * Set default properties.
 */
NotFound.defaultProps = {}

export default NotFound
