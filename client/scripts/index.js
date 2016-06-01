/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from 'store/store'
import Root from 'containers/Root/Root'

/**
 * This is the application index file.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

/**
 * Render the app with react-router.
 */
render((
  <Root store={store} history={syncHistoryWithStore(browserHistory, store)} />
), document.getElementById('root'))
