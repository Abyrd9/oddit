import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
  render() {
    return (
      <div className="input-main-container">
        <div className="icon-container"></div>
        <div className="input-container">
          <input
            className="input"
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
          />
        </div>
      </div>
    );
  }
}

export default Input;
