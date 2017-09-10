import React, { Component } from 'react';
import './LoginForm.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {emailChanged, passChanged, loginUser} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

function errorText(error) {
  if (error === "") {
    return null;
  } else {
    return <p className="error-text">{error}</p>
  }
}

class LoginForm extends Component {

  clickHandler(email, password) {
    this.props.loginUser(email, password)
  }

  render() {
    return (
        <div className="login-form-container">
          <Input
            value={this.props.email}
            onChange={(e) => this.props.emailChanged(e.target.value)}
            onBlur={console.log('It worked!')}
            placeholder="email"
          />
          <Input
            value={this.props.password}
            onChange={(e) => this.props.passChanged(e.target.value)}
            placeholder="password"
          />

          {errorText(this.props.error)}

          <Button buttonText="Sign In" onClick={() => this.clickHandler(this.props.email, this.props.password)}/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.userAuth.email,
    password: state.userAuth.password,
    error: state.userAuth.error
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    emailChanged: emailChanged,
    passChanged: passChanged,
    loginUser: loginUser
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);
