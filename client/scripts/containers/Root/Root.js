/*
 * This file is part of the React redux JWT starter.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

let Root = null

if (process.env.NODE_ENV === 'production') {
  Root = require('./Root.prod').default
} else {
  Root = require('./Root.dev').default
}

export default Root
