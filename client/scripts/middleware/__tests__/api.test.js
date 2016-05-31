require('es6-promise').polyfill()
require('whatwg-fetch')

import test from 'ava'
import sinon from 'sinon'

import api, { API } from 'middleware/api'

test.beforeEach(() => {
  sinon.stub(window, 'fetch')
})

test.afterEach(() => {
  window.fetch.restore()
})

test('middleware:API calls next action handler if API symbol missing', t => {
  const anAction = {}
  const middleware = api({ getState: () => {} })

  const doNext = (action) => {
    t.pass('next handler called')
    t.deepEqual(anAction, action)
  }

  const callMiddlewareWithAction = middleware(doNext)

  t.plan(2)
  callMiddlewareWithAction(anAction)
})

test.serial.cb('middleware:API dispatches request and success when the request is successful', t => {
  const response = { hello: 'world' }

  const responseObject = new window.Response(JSON.stringify(response), {
    status: 201,
    headers: { 'Content-type': 'application/json' }
  })

  window.fetch.returns(Promise.resolve(responseObject))

  const anAction = {
    [API]: {
      endpoint: '/test',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  }

  const middleware = api({ getState: () => {} })

  const doNext = (action) => {
    t.pass('next handler called')

    switch (action.type) {
      case 'REQUEST':
        t.is(action.payload, undefined)
        break

      case 'SUCCESS':
        t.deepEqual(action.payload, response)
        t.end()
        break

      default:
        t.fail('Wrong action type emitted.')
        t.end()
    }
  }

  const callMiddlewareWithAction = middleware(doNext)

  t.plan(4)
  callMiddlewareWithAction(anAction)
})

test.serial.cb('middleware:API dispatches request and failure when the request fails', t => {
  const response = { hello: 'world' }

  const responseObject = new window.Response(JSON.stringify(response), {
    status: 404,
    headers: { 'Content-type': 'application/json' }
  })

  window.fetch.returns(Promise.resolve(responseObject))

  const anAction = {
    [API]: {
      endpoint: '/test',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  }

  const middleware = api({ getState: () => {} })

  const doNext = (action) => {
    t.pass('next handler called')

    switch (action.type) {
      case 'REQUEST':
        t.is(action.payload, undefined)
        break

      case 'FAILURE':
        t.deepEqual(action.payload, response)
        t.end()
        break

      default:
        t.fail('Wrong action type emitted.')
        t.end()
    }
  }

  const callMiddlewareWithAction = middleware(doNext)

  t.plan(4)
  callMiddlewareWithAction(anAction)
})
