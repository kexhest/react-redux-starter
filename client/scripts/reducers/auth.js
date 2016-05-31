/*
 * This file is part of the React redux JWT starter.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_FAILURE,
  LOGOUT_SUCCESS
} from 'actions/actions'

const { localStorage } = window

const token = localStorage.getItem('token')

const initialState = {
  isAuthenticated: !!token,
  token: token || null
}

/**
 * This is the auth reducer. It listens for actions and updates the auth object.
 */
export default function (state = initialState, { type, payload }) {
  switch (type) {

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)

      return {
        ...state,
        isAuthenticated: true,
        token: payload.token
      }

    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')

      return {
        ...state,
        isAuthenticated: false,
        token: null
      }

    default:
      return state

  }
}
