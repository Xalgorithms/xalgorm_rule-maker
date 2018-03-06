import React, { Component } from 'react';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import withAuthorization from '../Auth/withAuthorization'

class Home extends Component {
  render() {
    return (<div>home, home, home</div>);
  }
}

const authCondition = (authUser) => !!authUser;

export default compose(
  firebaseConnect([
    'documents' // { path: '/documents' } // object notation
  ]),
  connect(
    (state) => ({
      documents: state.firebase.data.documents,
      // profile: state.firebase.profile // load profile
    })
  ),
  withAuthorization(authCondition),
)(Home)
