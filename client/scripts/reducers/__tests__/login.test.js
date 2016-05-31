import test from 'ava'

import reducer from '../login'

import * as actions from 'actions/actions'

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

test.serial('Reducer:Login returns initial state', t => {
  const action = {}

  const expected = { ...initialState }

  t.deepEqual(reducer(undefined, action), expected)
})

test.serial('Reducer:Login responds to LOGIN_REQUEST', t => {
  const action = { type: actions.LOGIN_REQUEST }

  const expected = {
    ...initialState,
    sending: true
  }

  t.deepEqual(reducer(undefined, action), expected)
})

test.serial('Reducer:Login responds to LOGIN_SUCCESS', t => {
  const action = { type: actions.LOGIN_SUCCESS }

  const expected = {
    ...initialState,
    sending: false
  }

  t.deepEqual(reducer(undefined, action), expected)
})

test.serial('Reducer:Login responds to LOGIN_FAILURE', t => {
  const action = {
    type: actions.LOGIN_FAILURE,
    payload: {
      meta: {
        error: 'Something went wrong'
      }
    }
  }

  const expected = {
    ...initialState,
    error: action.payload.meta.error,
    sending: false
  }

  t.deepEqual(reducer(undefined, action), expected)
})
