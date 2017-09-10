import React, {Component} from 'react';
import './ProfileNavbar.css';
import firebase from 'firebase';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

class ProfileNavbar extends Component {

  componentDidMount() {
    const profileBorder = document.querySelector('.profile-photo-border');
    const colorArray = ["#CFFFB3", "#EFE57A", "#B1DBD6", "#ED9680", "#C75146"]
    const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    profileBorder.style.backgroundColor = randomColor;
  }

  profileImage() {
    const firstLetter = this.props.name.charAt(0)
    return <p className="letter-image">{firstLetter}</p>
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      console.log("Signed Out");
    }, function(error) {
      console.log("Sign Out Error", error)
    })
  }

  render() {
    return (
      <div className="profile-nav-container">
        <div className="profile-photo-container">
          <div className="profile-photo-border">
            {this.profileImage()}
          </div>
          <p className="name-text">Welcome, {this.props.name}</p>
        </div>
        <div className="nav-container">
          <Link className="link-button" to="/Authen">
            <button className="sign-out" onClick={(e) => this.signOut()}>Sign Out</button>
          </Link>
        </div>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    name: state.userAuth.name
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileNavbar);
