import React, { Component } from 'react';
import './Button.css';

class Button extends Component {


  render() {
    return (
      <div className="button-main-container">
          <button
            className="button"
            onClick={this.props.onClick}
          >
            {this.props.buttonText}
          </button>
      </div>
    );
  }
}

export default Button;
