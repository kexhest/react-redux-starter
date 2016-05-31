import test from 'ava'

import reducer from '../user'

import * as actions from 'actions/actions'

const { localStorage } = window

const initialState = {}

test.beforeEach(() => {
  localStorage.clear()
})

test.serial('Reducer:User returns initial state', t => {
  const action = {}

  const expected = { ...initialState }

  t.deepEqual(reducer(undefined, action), expected)
})

test.serial('Reducer:User responds to LOGIN_SUCCESS', t => {
  const user = {
    id: 1,
    username: 'john',
    firstName: 'John',
    lastName: 'Doe'
  }

  const action = {
    type: actions.LOGIN_SUCCESS,
    payload: { user }
  }

  const expected = {
    ...initialState,
    ...user
  }

  t.deepEqual(reducer(undefined, action), expected)
  t.deepEqual(JSON.parse(localStorage.getItem('user')), user)
})

test.serial('Reducer:User responds to GET_USER_SUCCESS', t => {
  const user = {
    id: 1,
    username: 'john',
    firstName: 'John',
    lastName: 'Doe'
  }

  const action = {
    type: actions.GET_USER_SUCCESS,
    payload: { user }
  }

  const expected = {
    ...initialState,
    ...user
  }

  t.deepEqual(reducer(undefined, action), expected)
  t.deepEqual(JSON.parse(localStorage.getItem('user')), user)
})

test.serial('Reducer:User responds to LOGIN_FAILURE', t => {
  const action = {
    type: actions.LOGIN_FAILURE,
    meta: {
      error: 'Something went wrong'
    }
  }

  const expected = {
    ...initialState
  }

  t.deepEqual(reducer(undefined, action), expected)
  t.is(localStorage.getItem('user'), undefined)
})

test.serial('Reducer:User responds to LOGOUT_SUCCESS', t => {
  const action = {
    type: actions.LOGOUT_SUCCESS,
    meta: {
      error: 'Something went wrong'
    }
  }

  const expected = {
    ...initialState
  }

  t.deepEqual(reducer(undefined, action), expected)
  t.is(localStorage.getItem('user'), undefined)
})
