import React, { Component } from 'react';
import './SignupForm.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {emailChanged, passChanged, nameChanged, signUpUser} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

function errorText(error) {
  if (error === "") {
    return null;
  } else {
    return <p className="error-text">{error}</p>
  }
}

class SignupForm extends Component {

    clickHandler(email, password, name) {
      this.props.signUpUser(email, password, name)
    }

  render() {

    return (
        <div className="signup-form-container">
          <Input
            value={this.props.name}
            onChange={(e) => this.props.nameChanged(e.target.value)}
            placeholder="full name"
          />
          <Input
            value={this.props.email}
            onChange={(e) => this.props.emailChanged(e.target.value)}
            placeholder="email"
          />
          <Input
            value={this.props.password}
            onChange={(e) => this.props.passChanged(e.target.value)}
            placeholder="password"
          />

          {errorText(this.props.error)}

          <Button
            buttonText="Sign Up"
            onClick={() => this.clickHandler(this.props.name, this.props.password, this.props.email)}
          />
        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    email: state.userAuth.email,
    password: state.userAuth.password,
    name: state.userAuth.name,
    error: state.userAuth.error
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    emailChanged: emailChanged,
    passChanged: passChanged,
    nameChanged: nameChanged,
    signUpUser: signUpUser
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SignupForm);
