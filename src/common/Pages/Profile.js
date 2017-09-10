import React, { Component } from 'react';
import './Profile.css';

import QuestionNav from '../components/Questions/NumberTabs/QuestionNav';
import Questions from '../components/Questions/QuestionPages/Questions';
import ProfileNavbar from '../components/ProfileNavbar/ProfileNavbar';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Profile extends Component {

  componentDidUpdate() {
    if (this.props.isLoggedin === false) {
      this.props.history.push('/Authentication');
    }
  }

  render() {
    return (
    <div className="profile-container">
      <ProfileNavbar />
      <QuestionNav />
      <Questions />
    </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    loggedIn: state.userAuth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Profile));
