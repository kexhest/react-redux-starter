require('whatwg-fetch')
require('es6-promise').polyfill()

import test from 'ava'
import sinon from 'sinon'

import api from 'middleware/api'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk, api]
const mockStore = configureStore(middlewares)

import * as actions from '../actions'

let store = null

test.beforeEach(() => {
  store = mockStore({})

  sinon.stub(window, 'fetch')
})

test.afterEach(() => {
  window.fetch.restore()
})

test.serial('Action:loginUser dispatches LOGIN_REQUEST and LOGIN_SUCCESS on success', t => {
  t.plan(1)

  const successResponse = {
    token: 'xxxxxxxxxxxx.xxxxxxxxxxx.xxxxxxxxxxxxx',
    user: {
      id: 1,
      username: 'john',
      firstName: 'John',
      lastName: 'Doe'
    }
  }

  const successResponseObj = new window.Response(JSON.stringify(successResponse), {
    status: 201,
    headers: { 'Content-type': 'application/json' }
  })

  window.fetch.returns(Promise.resolve(successResponseObj))

  const expectedActions = [
    { type: actions.LOGIN_REQUEST },
    {
      type: actions.LOGIN_SUCCESS,
      payload: successResponse
    }
    // {
    //   type: actions.LOGIN_FAILURE,
    //   payload: errorResponse
    // }
  ]

  const creds = {
    username: 'john',
    password: '12345'
  }

  return store
    .dispatch(actions.loginUser(creds))
    .then(() => {
      t.deepEqual(store.getActions(), expectedActions)
    })
})

test.serial('Action:getUser dispatches GET_USER_REQUEST and GET_USER_SUCCESS on success', t => {
  t.plan(1)

  const successResponse = {
    token: 'xxxxxxxxxxxx.xxxxxxxxxxx.xxxxxxxxxxxxx',
    user: {
      id: 1,
      username: 'john',
      firstName: 'John',
      lastName: 'Doe'
    }
  }

  const successResponseObj = new window.Response(JSON.stringify(successResponse), {
    status: 200,
    headers: { 'Content-type': 'application/json' }
  })

  window.fetch.returns(Promise.resolve(successResponseObj))

  const expectedActions = [
    { type: actions.GET_USER_REQUEST },
    {
      type: actions.GET_USER_SUCCESS,
      payload: successResponse
    }
  ]

  const token = 'xxxxxxxxxxxx.xxxxxxxxxxx.xxxxxxxxxxxxx'

  return store
    .dispatch(actions.getUser(token))
    .then(() => {
      t.deepEqual(store.getActions(), expectedActions)
    })
})

test.serial('Action:logoutUser dispatches LOGOUT_REQUEST and LOGOUT_SUCCESS on success', t => {
  t.plan(1)

  const successResponse = {}

  const successResponseObj = new window.Response(JSON.stringify(successResponse), {
    status: 204,
    headers: { 'Content-type': 'application/json' }
  })

  window.fetch.returns(Promise.resolve(successResponseObj))

  const expectedActions = [
    { type: actions.LOGOUT_REQUEST },
    {
      type: actions.LOGOUT_SUCCESS,
      payload: successResponse
    }
  ]

  const token = 'xxxxxxxxxxxx.xxxxxxxxxxx.xxxxxxxxxxxxx'

  return store
    .dispatch(actions.logoutUser(token))
    .then(() => {
      t.deepEqual(store.getActions(), expectedActions)
    })
})
