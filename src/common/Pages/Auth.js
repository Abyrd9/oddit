import React, {Component} from 'react';
import './Auth.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthToggle from '../components/AuthToggle/AuthToggle';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleAuthSignIn, toggleAuthSignUp} from '../actions';



function authRender(page) {
  if(page === 'SignIn') {
    return <LoginForm />
  } else if(page === 'SignUp') {
    return <SignupForm />
  }
}

class Auth extends Component {

  buttonToggle(button, page) {
    if(button.classList.contains('left')) {
      if(button.classList.contains('active')) {
        null;
      } else {
        button.nextSibling.nextSibling.classList.toggle('active');
        button.classList.toggle('active');
        this.props.toggleAuthSignIn('SignIn');
        authRender(page);
      }
    } else if (button.classList.contains('right')) {

      if(button.classList.contains('active')) {
        null;
      } else {
        button.previousSibling.previousSibling.classList.toggle('active');
        button.classList.toggle('active');
        this.props.toggleAuthSignUp('SignUp');
        authRender(page);
      }
    }
  }

  render() {
    return (
      <div className="Container">
        <div className="auth-container">
          <AuthToggle
            onClickSignUp={(e) => this.buttonToggle(e.target, this.props.authPage)}
            onClickSignIn={(e) => this.buttonToggle(e.target, this.props.authPage)}
          />
          {authRender(this.props.authPage)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authPage: state.userAuth.authPage
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleAuthSignIn: toggleAuthSignIn,
    toggleAuthSignUp: toggleAuthSignUp
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Auth);
