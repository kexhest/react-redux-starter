/*
 * This file is part of the React redux JWT starter.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from 'actions/actions'

const initialState = {
  legend: 'Sign in',
  fields: [
    {
      type: 'text',
      name: 'username',
      label: 'User',
      placeholder: '',
      required: true
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: '',
      required: true
    }
  ],
  error: {},
  sending: false
}

/**
 * This is the form reducer. It listens for actions and updates the form object.
 */
export default function (state = initialState, { type, payload }) {
  switch (type) {

    case LOGIN_REQUEST:
      return {
        ...state,
        error: {},
        sending: true
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        error: {},
        sending: false
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        error: payload.error,
        sending: false
      }

    default:
      return state

  }
}
