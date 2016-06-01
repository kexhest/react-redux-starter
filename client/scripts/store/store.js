/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

let store = null

if (process.env.NODE_ENV === 'production') {
  store = require('./store.prod').default
} else {
  store = require('./store.dev').default
}

export default store
