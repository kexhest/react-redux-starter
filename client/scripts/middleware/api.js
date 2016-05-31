/*
 * This file is part of the React redux JWT starter.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Symbol from 'es6-symbol'

export const BASE_URL = 'http://localhost:3000/v1'

/**
 * Creates request object and returns a fetch promise.
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {object} body
 * @param {bool} token
 *
 * @return {Promise}
 */
function callApi (endpoint, method, body, token) {
  const { Headers, fetch } = window

  const request = {
    method: method || 'GET',
    credentials: 'same-origin',
    headers: new Headers()
  }

  request.headers.append('Accept', 'application/json')
  request.headers.append('Content-Type', 'application/json')

  if (body && typeof body !== 'object') {
    return new Promise((resolve, reject) => reject('Body must be an object.'))
  }

  if (body) {
    request.body = JSON.stringify(body)
  }

  if (token) {
    request.headers.append('Authorization', `Bearer ${token}`)
  }

  return fetch(BASE_URL + endpoint, request)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return new Promise((resolve, reject) => reject(json))
      }

      return json
    })
    .catch(err => Promise.reject(err))
}

/**
 * API symbol.
 *
 * @type {Symbol}
 */
export const API = Symbol('API')

/**
 * Api middleware, wraps action with fetch request. Subsequently triggers actions
 * corresponding to the types passed with the initial action.
 *
 * @return {Promise}
 */
export default () => next => action => {
  const actionData = action[API]

  // Prevent middleware from going past this point if not API is specified.
  if (typeof actionData === 'undefined') {
    return next(action)
  }

  const { endpoint, method, body, token } = actionData
  const [requestType, successType, failureType] = actionData.types

  next({ type: requestType })

  return callApi(endpoint, method, body, token).then(
    response =>
      next({
        type: successType,
        payload: response
      }),
    errors =>
      next({
        type: failureType,
        payload: errors || 'There was an error.'
      })
  )
}
