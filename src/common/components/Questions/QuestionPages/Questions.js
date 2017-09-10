import React, { Component } from 'react';
import './Question.css';
import './ClipboardModal.css';
import NumberTabs from '../NumberTabs/NumberTabs';
import QuestionInput from '../QuestionInput/QuestionInput';
import VotingResults from '../../Voting/VotingResults';

import {withRouter} from 'react-router-dom';

import {questionChange, questionSave, shareClicked, votesUpdate} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import firebase from 'firebase';

class Questions extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.props.votesUpdate(this.props.currentPage, this.props.userId)
    }
    this.copyClipboardModal(this.props.shareClickedToggle)
  }

  buttonText(saved) {
    if(saved === true) {
      return "saved"
    } else {
      return "save"
    }
  }

  saveButtonStyle(saved) {
    if(saved === true) {
      return "saved"
    } else {
      return ""
    }
  }

  buttonSaved(text, saved) {
    if (saved === true) {
      null;
    } else {
      const buttons = document.querySelectorAll('button.question-button');
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('active')) {
          const number = i + 1;
          this.props.questionSave(number, text)
        }
      }
    }
  }

  questionChange(text) {
    const buttons = document.querySelectorAll('button.question-button');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains('active')) {
        const number = i + 1;
        this.props.questionChange(number, text)
      }
    }
  }

  shareButtonStyle(shareable) {
    if (shareable === false) {
      return "nonshareable"
    } else {
      null
    }
  }

  copyClipboardModal(clicked, modalInputValue) {
    if (clicked === true) {
      return (
        <div className="modal-container">
          <button className="copy-modal-button"
          onClick={(e) => {
            const inputValue = document.querySelector('.modal-input');
            inputValue.select();
            document.execCommand('copy');
            }
          }
          >copy to clipboard</button>
          <input className="modal-input" value={modalInputValue} />
        </div>
      )
    } else {
      return (
        null
      )
    }
  }

  buttonShared(shareable, clicked) {
    if (shareable===false) {
      null
    } else {
      if (clicked === true) {
        this.props.shareClicked(false);
      } else {
        this.props.shareClicked(true);
      }

    }
  }

  render() {
    return (
    <div className="container">
      <div className="question-container">
        <QuestionInput
          questionTitle={this.props.liveQuestionTitle}
          placeholder="Start typing here..."
          value={this.props.liveText}
          onChange={(e) => this.questionChange(e.target.value)}

          shareButtonText="Share"
          shareButtonStyle={this.shareButtonStyle(this.props.shareable)}
          shareClick={(e) => this.buttonShared(this.props.shareable, this.props.shareClickedToggle)}

          copyClipboardModal={this.copyClipboardModal(this.props.shareClickedToggle, this.props.modalInputValue)}
          modalInputValue="This is a modal!"

          saveButtonText={this.buttonText(this.props.liveSaved)}
          savedButtonStyle={this.saveButtonStyle(this.props.liveSaved)}
          saveClick={(e) => this.buttonSaved(this.props.liveText, this.props.liveSaved)}
        />
      <VotingResults
        votingTitle="Voting Results"
        voteTotal={this.props.totalVotes + "votes"}
        buttonOneText={this.props.publicVotes[0] + '%'}
        buttonTwoText={this.props.publicVotes[1] + '%'}
        buttonThreeText={this.props.publicVotes[2] + '%'}
        buttonFourText={this.props.publicVotes[3] + '%'}
        buttonFiveText={this.props.publicVotes[4] + '%'}
      />
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    liveText: state.questionState.liveText,
    liveSaved: state.questionState.liveSaved,
    liveQuestionTitle: state.questionState.liveQuestionTitle,
    shareable: state.questionState.shareable,
    shareClickedToggle: state.questionState.shareClickedToggle,
    modalInputValue: state.questionState.modalInputValue,
    currentPage: state.questionState.currentPage,
    userId: state.userAuth.user,
    publicVotes: state.questionState.publicVotes,
    totalVotes: state.questionState.totalVotes
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    questionChange: questionChange,
    questionSave: questionSave,
    shareClicked: shareClicked,
    votesUpdate: votesUpdate
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Questions));
