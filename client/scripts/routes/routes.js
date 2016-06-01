/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import store from 'store/store'

import App from 'containers/App/App'

import Login from 'components/Login/Login'
import Dashboard from 'components/Dashboard/Dashboard'
import NotFound from 'components/NotFound/NotFound'

/**
 * These are the application routes.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

/**
 * Block access to routes depending on auth status.
 *
 * @param {object} nextState
 * @param {function} replace
 *
 * @return {void}
 */
function requireAuth (nextState, replace) {
  const { auth } = store.getState()

  if (!auth.isAuthenticated) {
    replace({
      pathname: '/login',
      state: {
        next: nextState.location.pathname
      }
    })
  }
}

/**
 * Redirect to startpage if user is authed.
 *
 * @param {object} nextState
 * @param {function} replace
 *
 * @return {void}
 */
function redirectToDashboard (nextState, replace) {
  const { auth } = store.getState()

  if (auth.isAuthenticated) {
    replace('/')
  }
}

/**
 * Export application routes.
 *
 * @type {object}
 */
export default [
  {
    path: '/',
    component: App,
    indexRoute: {
      onEnter: requireAuth,
      component: Dashboard
    },
    childRoutes: [
      {
        onEnter: redirectToDashboard,
        childRoutes: [
          {
            path: 'login',
            component: Login
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]
