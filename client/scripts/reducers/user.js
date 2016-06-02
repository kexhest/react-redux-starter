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
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from 'actions/actions'

const user = (() => {
  try {
    return window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user')) || {}
  } catch (err) {
    return {}
  }
})()

const initialState = {}

/**
 * This is the user reducer. It listens for actions and updates the user object.
 */
export default function (state = { ...initialState, ...user }, { type, payload }) {
  switch (type) {

    case LOGIN_SUCCESS:
    case GET_USER_SUCCESS:
      try {
        window.localStorage.setItem('user', JSON.stringify(payload.user))
      } catch (err) {
        console.log(err)
      }

      return {
        ...state,
        ...payload.user
      }

    case GET_USER_FAILURE:
    case LOGOUT_SUCCESS:
      try {
        window.localStorage.removeItem('user')
      } catch (err) {
        console.log(err)
      }

      return initialState

    default:
      return state

  }
}
