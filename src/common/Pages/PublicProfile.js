import React, { Component } from 'react';
import './Profile.css';

import PublicQuestionNav from '../components/Questions/NumberTabs/PublicQuestionNav';
import PublicQuestions from '../components/Questions/QuestionPages/PublicQuestions';
// import PublicProfileNavbar from '../components/ProfileNavbar/PublicProfileNavbar';

import {publicProfileMount} from '../actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class PublicProfile extends Component {

  componentWillMount() {
    const currentPath = this.props.location.pathname.toString();
    const pathSplit = currentPath.split('/');
    const userId = pathSplit[3];
    this.props.publicProfileMount(userId);
  }

  render() {
    return (
    <div className="profile-container">
      <PublicQuestionNav />
      <PublicQuestions />
    </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    loggedIn: state.userAuth.loggedIn
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    publicProfileMount: publicProfileMount
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(PublicProfile));
