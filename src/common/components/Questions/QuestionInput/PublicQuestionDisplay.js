import React, { Component } from 'react';
import './QuestionInput.css';

class PublicQuestionDisplay extends Component {

  render() {
    return (
    <div className="question-input-container">
      <div className="title-container">
        <p className="title">{this.props.questionTitle}</p>
      </div>
      <div className="textdisplay-container">
        <p className="text-display">{this.props.value}</p>
      </div>
    </div>
    );
  }
}

export default PublicQuestionDisplay;
