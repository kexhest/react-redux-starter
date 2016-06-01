/*
 * This file is part of the React Redux starter repo.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import './app.scss'

import React, { Component, PropTypes, cloneElement } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ActionCreators from 'actions/actions'

/**
 * This is the App component class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export class App extends Component {

  /**
   * Create App and set initial state.
   *
   * @param {object} props
   *
   * @return void
   */
  // constructor (props) {
  //   super(props)
  // }

  /**
   * Lifecycle method, triggered when the component is mounted to the DOM.
   *
   * @return {void}
   */
  componentDidMount () {
    const { auth } = this.props
    const { getUser } = this.props.actions
    const { router } = this.context

    // Token exists from before, try to fetch user details to see if session is
    // still valid. If not, redirect to login.
    if (auth.isAuthenticated) {
      getUser(auth.token)
        .then(response => {
          if (response.type === 'GET_USER_FAILURE') router.replace('/login')
        })
    }
  }

  /**
   * Lifecycle method, triggered when the component receives new props.
   *
   * @return {void}
   */
  componentWillReceiveProps (nextProps) {
    const { location, auth } = this.props
    const { router } = this.context

    // User has successfully logged in, redirect to '/' -> dashboard.
    if (!auth.isAuthenticated && nextProps.auth.isAuthenticated) {
      router.replace(location.state && location.state.next || '/')
    }

    if (auth.isAuthenticated && !nextProps.auth.isAuthenticated) {
      router.replace('/login')
    }
  }

  /**
   * Render react component.
   *
   * @return {object}
   */
  render () {
    const { user, login, children, actions } = this.props

    return (
      <div className='app'>
        {children && cloneElement(children, {
          ...user,
          ...login,
          ...actions
        })}
      </div>
    )
  }

}

/**
 * Declare expected property types.
 */
App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  actions: PropTypes.object,
  auth: PropTypes.object,
  user: PropTypes.object,
  login: PropTypes.object
}

/**
 * Declare expected context types.
 */
App.contextTypes = {
  router: PropTypes.object
}

/**
 * Set default properties.
 */
App.defaultProps = {}

/**
 * Map state to props.
 *
 * @param {object} state
 *
 * @return {object}
 */
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  login: state.login
})

/**
 * Map action dispatchers to props.
 *
 * @param {object} dispatch
 *
 * @return {object}
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

/**
 * Export redux container component by subscribing the component to the store
 * and binding necessary action dispatchers.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
