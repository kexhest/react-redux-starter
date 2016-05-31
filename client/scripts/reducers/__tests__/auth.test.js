import test from 'ava'

import reducer from '../auth'

import * as actions from 'actions/actions'

const { localStorage } = window

const initialState = {
  isAuthenticated: false,
  token: null
}

test.beforeEach(() => {
  localStorage.clear()
})

test.serial('Reducer:Auth returns initial state', t => {
  const action = {}

  const expected = { ...initialState }

  t.deepEqual(reducer(undefined, action), expected)
  t.is(localStorage.getItem('token'), undefined)
})

test.serial('Reducer:Auth responds to LOGIN_SUCCESS', t => {
  const token = 'xxxxxxx.xxxxxx.xxxx'

  const action = {
    type: actions.LOGIN_SUCCESS,
    payload: {
      token
    }
  }

  const expected = {
    isAuthenticated: true,
    token
  }

  t.deepEqual(reducer(undefined, action), expected)
  t.is(localStorage.getItem('token'), token)
})

test.serial('Reducer:Auth responds to LOGIN_ERROR', t => {
  const token = 'xxxxxxx.xxxxxx.xxxx'

  const action = {
    type: actions.LOGIN_ERROR,
    payload: {
      token
    }
  }

  const expected = { ...initialState }

  t.deepEqual(reducer(undefined, action), expected)
  t.is(localStorage.getItem('token'), undefined)
})

test.serial('Reducer:Auth responds to GET_USER_FAILURE', t => {
  const token = 'xxxxxxx.xxxxxx.xxxx'

  const action = {
    type: actions.GET_USER_FAILURE,
    payload: {
      token
    }
  }

  const expected = { ...initialState }

  t.deepEqual(reducer(undefined, action), expected)
  t.is(localStorage.getItem('token'), undefined)
})

test.serial('Reducer:Auth responds to LOGOUT_SUCCESS', t => {
  const token = 'xxxxxxx.xxxxxx.xxxx'

  const action = {
    type: actions.LOGOUT_SUCCESS,
    payload: {
      token
    }
  }

  const expected = { ...initialState }

  t.deepEqual(reducer(undefined, action), expected)
  t.is(localStorage.getItem('token'), undefined)
})
