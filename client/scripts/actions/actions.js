/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { API } from 'middleware/api'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

/**
 * Login user action.
 *
 * @param {object} creds
 *
 * @return {object}
 */
export const loginUser = (creds) => ({
  [API]: {
    endpoint: '/auth',
    method: 'POST',
    body: {
      grant_type: 'password',
      ...creds
    },
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
  }
})

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'

/**
 * Get user action.
 *
 * @param {string} token
 *
 * @return {object}
 */
export const getUser = (token) => ({
  [API]: {
    endpoint: '/users/me',
    method: 'GET',
    token,
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE]
  }
})

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

/**
 * Logout user action.
 *
 * @return {object}
 */
export const logoutUser = (token) => ({
  [API]: {
    endpoint: '/auth',
    method: 'DELETE',
    token,
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]
  }
})
