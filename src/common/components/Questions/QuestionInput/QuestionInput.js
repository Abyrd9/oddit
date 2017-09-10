import React, { Component } from 'react';
import './QuestionInput.css';

class QuestionInput extends Component {

  render() {
    return (
    <div className="question-input-container">
      <div className="title-container">
        <p className="title">{this.props.questionTitle}</p>
      </div>
      <div className="textarea-container">
        <textarea
          className="textarea"
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          rows="10"
         />
      </div>
      <div className="input-footer-container">
        <button className={"share-button " + this.props.shareButtonStyle} onClick={this.props.shareClick}>{this.props.shareButtonText}</button>
        <button className={"save-button " + this.props.savedButtonStyle} onClick={this.props.saveClick}>{this.props.saveButtonText}</button>
      </div>
      {this.props.copyClipboardModal}
    </div>
    );
  }
}

export default QuestionInput;
