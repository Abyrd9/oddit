import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class AuthenticatedComponent extends Component {
  componentWillUpdate() {
    if (this.props.isLoggedin === false) {
      this.props.history.push('/Authentication');
    }
  }

  render() {
    return (this.props.isLoggedin === true) ? this.props.children : null
  }
}

function mapStateToProps(state) {
  return {
    isLoggedin: state.userAuth.loggedIn,
    user: state.userAuth.user
  }
}

export default withRouter(connect(mapStateToProps)(AuthenticatedComponent))
