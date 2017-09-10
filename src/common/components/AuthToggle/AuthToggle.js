import React, { Component } from 'react';
import './AuthToggle.css';

class AuthToggle extends Component {

  render() {
    return (
        <div className="toggle-container">
          <button className="toggle-button left active" onClick={this.props.onClickSignIn}>Sign In</button>
          <p className="toggle-text">or</p>
          <button className="toggle-button right" onClick={this.props.onClickSignUp}>Sign Up</button>
        </div>
    );
  }
}


export default AuthToggle;
