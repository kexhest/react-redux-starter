/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT_SUCCESS
} from 'actions/actions'

const token = (() => {
  try {
    return window.localStorage.getItem('token')
  } catch (err) {
    console.log(err)
  }
})()

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
    case GET_USER_SUCCESS:
      try {
        window.localStorage.setItem('token', payload.token)
      } catch (err) {
        console.log(err)
      }

      return {
        ...state,
        isAuthenticated: true,
        token: payload.token
      }

    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case LOGOUT_SUCCESS:
      try {
        window.localStorage.removeItem('token')
      } catch (err) {
        console.log(err)
      }

      return {
        ...state,
        isAuthenticated: false,
        token: null
      }

    default:
      return state

  }
}
