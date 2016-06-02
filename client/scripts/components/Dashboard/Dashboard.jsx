/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import './dashboard.scss'

import React, { PropTypes } from 'react'

/**
 * This is the Dashboard component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const Dashboard = ({ id, username, firstName, lastName, doLogout }) =>
  <article className='dashboard'>
    <header>
      <h2>Logged in as:</h2>
    </header>
    <table>
      <tbody>
        <tr>
          <td>id:</td>
          <td className='id'>{id}</td>
        </tr>
        <tr>
          <td>username:</td>
          <td className='username'>{username}</td>
        </tr>
        <tr>
          <td>full name:</td>
          <td className='fullname'>{firstName} {lastName}</td>
        </tr>
      </tbody>
    </table>
    <button onClick={doLogout}>Logout</button>
  </article>

/**
 * Declare expected property types.
 */
Dashboard.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  doLogout: PropTypes.func
}

/**
 * Set default properties.
 */
Dashboard.defaultProps = {}

export default Dashboard
