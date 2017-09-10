import React, { Component } from 'react';
import './Question.css';
import './ClipboardModal.css';
import NumberTabs from '../NumberTabs/NumberTabs';
import PublicQuestionDisplay from '../QuestionInput/PublicQuestionDisplay';
import VotingPublic from '../../Voting/VotingPublic';

import {withRouter} from 'react-router-dom';

import {updateVoteClicked, submitActiveChange, submitVotes} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import firebase from 'firebase';

class PublicQuestions extends Component {

  componentDidMount() {
    console.log("This component Mounted.")
    const {OneVote, TwoVote, ThreeVote, FourVote, FiveVote} = this.props;
    const buttons = document.querySelectorAll('button.question-button');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains('active')) {
        var questionButton = i;
        var voteArray = [OneVote, TwoVote, ThreeVote, FourVote, FiveVote];
        const voteButtons = document.querySelectorAll('.voting-button-public');
        if (i===0) {
          if (voteArray[0] === null) {null} else {voteButtons[voteArray[0]].classList.toggle('button-voted');}
        } else if (i===1) {
          if (voteArray[1] === null) {null} else {voteButtons[voteArray[1]].classList.toggle('button-voted');}
        } else if (i===2) {
          if (voteArray[2] === null) {null} else {voteButtons[voteArray[2]].classList.toggle('button-voted');}
        } else if (i===3) {
          if (voteArray[3] === null) {null} else {voteButtons[voteArray[3]].classList.toggle('button-voted');}
        } else if (i===4) {
          if (voteArray[4] === null) {null} else {voteButtons[voteArray[4]].classList.toggle('button-voted');}
        }
      }
    }
  }


  componentDidUpdate(prevProps) {
    const {
      OneVote,
      TwoVote,
      ThreeVote,
      FourVote,
      FiveVote,
      OneVoteSaved,
      TwoVoteSaved,
      ThreeVoteSaved,
      FourVoteSaved,
      FiveVoteSaved,
      submitted
    } = this.props;
    const voteNumbers = [OneVote, TwoVote, ThreeVote, FourVote, FiveVote];
    const voteSaves = [OneVoteSaved, TwoVoteSaved, ThreeVoteSaved, FourVoteSaved, FiveVoteSaved];
    if (OneVoteSaved === true && TwoVoteSaved === true && ThreeVoteSaved === true && FourVoteSaved === true && FiveVoteSaved === true && submitted === false) {
      console.log("submit active is true")
      this.props.submitActiveChange(true)
    } else {console.log("submit active is false")}
    if (prevProps.currentPage !== this.props.currentPage) {
      const voteButtons = document.querySelectorAll('.voting-button-public');
      if (this.props.currentPage === "one") {
        console.log('PageOne!')
        if (voteSaves[0] === true) {voteButtons[voteNumbers[0]-1].classList.toggle('button-voted')}
      } else if (this.props.currentPage === "two") {
        console.log('PageTwo!')
        if (voteSaves[1] === true) {voteButtons[voteNumbers[1]-1].classList.toggle('button-voted')}
      } else if (this.props.currentPage === "three") {
        console.log('PageThree!')
        if (voteSaves[2] === true) {voteButtons[voteNumbers[2]-1].classList.toggle('button-voted')}
      } else if (this.props.currentPage === "four") {
        console.log('PageFour!')
        if (voteSaves[3] === true) {voteButtons[voteNumbers[3]-1].classList.toggle('button-voted')}
      } else if (this.props.currentPage === "five") {
        console.log('PageFive!')
        if (voteSaves[4] === true) {voteButtons[voteNumbers[4]-1].classList.toggle('button-voted')}
      } else {
        console.log('Did not work!')
        null
      }
    }
  }

  voteClick(button, currentPage) {
    const voteButtons = document.querySelectorAll('.voting-button-public');
    for (let i = 0; i < voteButtons.length; i++) {
      if (voteButtons[i].classList.contains('button-voted')) {
        voteButtons[i].classList.toggle('button-voted')
      }
    }
    button.classList.toggle('button-voted');
    for (let i = 0; i < voteButtons.length; i++) {
      if (voteButtons[i].classList.contains('button-voted')) {
        var voteButton = i + 1;
      }
    }
    const {OneVoteSaved, TwoVoteSaved, ThreeVoteSaved, FourVoteSaved, FiveVoteSaved} = this.props;
    if (voteButton === 1) {
      var Saved = OneVoteSaved ? false : true;
    } else if (voteButton === 2) {
      var Saved = TwoVoteSaved ? false : true;
    } else if (voteButton === 3) {
      var Saved = ThreeVoteSaved ? false : true;
    } else if (voteButton === 4) {
      var Saved = FourVoteSaved ? false : true;
    } else if (voteButton === 5) {
      var Saved = FiveVoteSaved ? false : true;
    }
    this.props.updateVoteClicked(
      currentPage,
      voteButton,
      true,
      this.props.userId,
      OneVoteSaved,
      TwoVoteSaved,
      ThreeVoteSaved,
      FourVoteSaved,
      FiveVoteSaved
    )
  }

  submitStyle(active) {
    const submitButton = document.querySelectorAll('.submit-button')
    if (active === true) {
      return ""
      console.log(active)
    } else {
      return " nonsubmit"
      console.log(active)
    }
  }

  submitClick() {
    const {
      OneVote,
      TwoVote,
      ThreeVote,
      FourVote,
      FiveVote,
      userId
    } = this.props;
    this.props.submitVotes(OneVote-1, TwoVote-1, ThreeVote-1, FourVote-1, FiveVote-1, userId)
    this.props.submitActiveChange(false)
  }

  render() {
    return (
    <div className="container">
      <div className="question-container">
        <PublicQuestionDisplay
          questionTitle={this.props.liveQuestionTitle}
          value={this.props.liveText}
        />
      <VotingPublic
        votingTitle={"How well does this answer match " + this.props.name + "?"}
        voteClick={(e) => this.voteClick(e.target, this.props.currentPage)}
        submitStyle={this.submitStyle(this.props.submitActive)}
        submitClick={(e) => this.submitClick()}
      />
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    liveText: state.questionState.liveText,
    liveQuestionTitle: state.questionState.liveQuestionTitle,
    name: state.userAuth.name,
    OneVote: state.publicProfileState.OneVote,
    TwoVote: state.publicProfileState.TwoVote,
    ThreeVote: state.publicProfileState.ThreeVote,
    FourVote: state.publicProfileState.FourVote,
    FiveVote: state.publicProfileState.FiveVote,
    OneVoteSaved: state.publicProfileState.OneVoteSaved,
    TwoVoteSaved: state.publicProfileState.TwoVoteSaved,
    ThreeVoteSaved: state.publicProfileState.ThreeVoteSaved,
    FourVoteSaved: state.publicProfileState.FourVoteSaved,
    FiveVoteSaved: state.publicProfileState.FiveVoteSaved,
    currentPage: state.questionState.currentPage,
    userId: state.publicProfileState.publicId,
    submitActive: state.publicProfileState.submitActive,
    submitted: state.publicProfileState.submitted
  }
}

  function matchDispatchToProps(dispatch) {
    return bindActionCreators({
      updateVoteClicked: updateVoteClicked,
      submitActiveChange: submitActiveChange,
      submitVotes: submitVotes
    }, dispatch)
  }

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(PublicQuestions));
