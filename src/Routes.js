import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import {connect} from 'react-redux';

import Auth from './common/Pages/Auth';
import Profile from './common/Pages/Profile';
import PublicProfile from './common/Pages/PublicProfile';

class Routes extends Component {

  ProtectedRoute = () => (
    this.props.isLoggedin ? (
      <Redirect to={'/Profile/QuestionOne/' + this.props.user}/>
    ) : (
      <Auth />
    )
  )

  RootRoute = () => (
    <Redirect to='/Profile/'/>
  )

  render() {
    return (
      <BrowserRouter>
        <div className="route-container">
            <Route exact path="/Authentication" component={Auth} />
            <Route path="/Profile/" render={this.ProtectedRoute} />
            <Route path="/Profile/" component={Profile} />
            <Route path="/PublicProfile/" component={PublicProfile} />
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedin: state.userAuth.loggedIn,
    user: state.userAuth.user
  }
}

export default connect(mapStateToProps)(Routes);
