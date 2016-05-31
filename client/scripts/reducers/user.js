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
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from 'actions/actions'

const { localStorage } = window

const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) || {}

const initialState = {}

/**
 * This is the user reducer. It listens for actions and updates the user object.
 */
export default function (state = { ...initialState, ...user }, { type, payload }) {
  switch (type) {

    case LOGIN_SUCCESS:
    case GET_USER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(payload.user))

      return {
        ...state,
        ...payload.user
      }

    case GET_USER_FAILURE:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('user')

      return initialState

    default:
      return state

  }
}
