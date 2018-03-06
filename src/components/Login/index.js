import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import GoogleButton from 'react-google-button'
import * as routes from '../../constants/routes';

class Login extends Component {
  onAuth = () => {
    const {
      history,
      firebase,
    } = this.props;

    firebase.login({ provider: 'google', type: 'popup' })
      .then(() => {
        history.push(routes.HOME);
      })
      .catch(error => {
        console.log("ERR", error);
      });
  }

  render() {
    const {
      auth,
    } = this.props;

    return (
      <div>
        <GoogleButton onClick={this.onAuth}>
          Login With Google
        </GoogleButton>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(Login)