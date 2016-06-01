/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import api from 'middleware/api'

import rootReducer from 'reducers/reducers'

/**
 * This is the redux store. It applies reducers and middlewares.
 */
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, api)
)

export default store
