import React, { Component } from 'react';
import './NumberTabs.css';
import {Link} from 'react-router-dom';

class NumberTabs extends Component {

  render() {
    return (
      <Link className="link-button" to={this.props.linkTo}>
        <button className={this.props.Class} onClick={this.props.onClick}>
          {this.props.number}
        </button>
      </Link>
    );
  }
}

export default NumberTabs;
