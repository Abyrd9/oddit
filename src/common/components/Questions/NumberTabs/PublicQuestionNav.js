import React, { Component } from 'react';
import './QuestionNav.css';
import NumberTabs from './NumberTabs';
import {questionRender} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withRouter} from 'react-router-dom';

class QuestionNav extends Component {

  activeQuestionButton(button, number) {
    if(button.classList.contains('active')) {
      null
    } else {
      const voteButtons = document.querySelectorAll('.voting-button-public');
      console.log(voteButtons)
      for (let i = 0; i < voteButtons.length; i++) {
        voteButtons[i].classList.remove('button-voted')
      }
      const parent = document.querySelectorAll('button.question-button');
      for (var i = 0; i < parent.length; i++) {
        parent[i].classList.remove('active')
      }
      button.classList.toggle('active')
    }
    const questionTextPropsArray = [
      this.props.QuestionOne,
      this.props.QuestionTwo,
      this.props.QuestionThree,
      this.props.QuestionFour,
      this.props.QuestionFive
    ]
    const questionSavedPropsArray = [
      this.props.OneSaved,
      this.props.TwoSaved,
      this.props.ThreeSaved,
      this.props.FourSaved,
      this.props.FiveSaved
    ]
    this.props.questionRender(number, questionTextPropsArray, questionSavedPropsArray)
  }

  render() {
    return (
    <div className="question-nav-container">
      <div className="numbertabs-container">
        <NumberTabs
          number="1"
          linkTo={"/PublicProfile/QuestionOne/" + this.props.userId}
          Class="question-button active"
          onClick={(e) => this.activeQuestionButton(e.target, 1)}
        />
        <NumberTabs
          number="2"
          linkTo={"/PublicProfile/QuestionTwo/" + this.props.userId}
          Class="question-button"
          onClick={(e) => this.activeQuestionButton(e.target, 2)}
        />
        <NumberTabs
          number="3"
          linkTo={"/PublicProfile/QuestionThree/" + this.props.userId}
          Class="question-button"
          onClick={(e) => this.activeQuestionButton(e.target, 3)}
        />
        <NumberTabs
          number="4"
          linkTo={"/PublicProfile/QuestionFour/" + this.props.userId}
          Class="question-button"
          onClick={(e) => this.activeQuestionButton(e.target, 4)}
        />
        <NumberTabs
          number="5"
          linkTo={"/PublicProfile/QuestionFive/" + this.props.userId}
          Class="question-button"
          onClick={(e) => this.activeQuestionButton(e.target, 5)}
        />
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userAuth.user,
    QuestionOne: state.questionState.QuestionOne,
    QuestionTwo: state.questionState.QuestionTwo,
    QuestionThree: state.questionState.QuestionThree,
    QuestionFour: state.questionState.QuestionFour,
    QuestionFive: state.questionState.QuestionFive,
    OneSaved: state.questionState.OneSaved,
    TwoSaved: state.questionState.TwoSaved,
    ThreeSaved: state.questionState.ThreeSaved,
    FourSaved: state.questionState.FourSaved,
    FiveSaved: state.questionState.FiveSaved,
    userId: state.publicProfileState.publicId
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    questionRender: questionRender
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(QuestionNav));
