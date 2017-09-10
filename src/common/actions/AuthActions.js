import firebase from 'firebase';

//Form Value Changes

export const emailChanged = (text) => {
  return {
    type: "EMAIL_CHANGE",
    payload: text
  }
}

export const passChanged  = (text) =>  {
  return {
    type: "PASS_CHANGE",
    payload: text
  }
}

export const nameChanged  = (text) =>  {
  return {
    type: "NAME_CHANGE",
    payload: text
  }
}

//Auth Switching

export const toggleAuthSignIn = (text) => {
  return {
    type: "TOGGLE_SIGNIN",
    payload: text
  }
}

export const toggleAuthSignUp = (text) => {
  return {
    type: "TOGGLE_SIGNUP",
    payload: text
  }
}

// SignUp

export const signUpUser = (name, password, email) => {
  return dispatch => {
    if (name === "") {
      signUpFail(dispatch, "Please add your full name");
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          const {currentUser} = firebase.auth();
          const userId = firebase.auth().currentUser.uid;
          signUpSuccess(dispatch, currentUser.uid)
          firebase.database().ref(`/users/${currentUser.uid}/info`)
            .set({name, email});
          const Questions = {QuestionOneText: "", QuestionTwoText: "", QuestionThreeText: "", QuestionFourText: "", QuestionFiveText: ""};
          firebase.database().ref('/users/' + userId + '/questionAnswers').update(Questions)
          const Votes = [0,0,0,0,0]
          const QuestionVotes = {QuestionOneVotes: Votes, QuestionTwoVotes: Votes, QuestionThreeVotes: Votes, QuestionFourVotes: Votes, QuestionFiveVotes: Votes}
          firebase.database().ref('/users/' + userId + '/questionVotes').update(QuestionVotes)
        })
        .catch((error) => signUpFail(dispatch, error.message))
    }
  }
}

export const signUpFail = (dispatch, text) => {
  dispatch({
    type: "SIGNUP_FAIL",
    payload: text
  });
}

export const signUpSuccess = (dispatch, user) => {
  dispatch({
    type: "SIGNUP_SUCCESS",
    payload: user
  })
}

// Login

export const loginUser = (email, password) => {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const {currentUser} = firebase.auth();
      loginSuccess(dispatch, currentUser.uid)
      const userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId + '/info').once('value')
        .then(function(snapshot) {
          const info = snapshot.val()
          nameMount(dispatch, info.name)
        })
      firebase.database().ref('/users/' + userId + '/questionAnswers').once('value')
        .then(function(snapshot) {
          const questionText = snapshot.val()
          if (questionText.QuestionOneText === undefined) {
            console.log("Question One is undefined!")
          }
          questionOneMount(dispatch, questionText.QuestionOneText)
          questionTwoMount(dispatch, questionText.QuestionTwoText)
          questionThreeMount(dispatch, questionText.QuestionThreeText)
          questionFourMount(dispatch, questionText.QuestionFourText)
          questionFiveMount(dispatch, questionText.QuestionFiveText)
          loginToggle(dispatch)
        })
      firebase.database().ref('/users/' + userId + '/questionAnswers').once('value')
        .then(function(snapshot) {
          const questionText = snapshot.val()
          if (questionText.QuestionOneText === undefined || questionText.QuestionOneText === "") {
            null
          } else if (questionText.QuestionTwoText === undefined || questionText.QuestionTwoText === "") {
            null
          } else if (questionText.QuestionThreeText === undefined || questionText.QuestionThreeText === "") {
            null
          } else if (questionText.QuestionFourText === undefined || questionText.QuestionFourText === "") {
            null
          } else if (questionText.QuestionFiveText === undefined || questionText.QuestionFiveText === "") {
            null
          } else {
            dispatch({type: "SHAREABLE_PROFILE"})
          }
        })
        firebase.database().ref('/users/' + userId + '/questionVotes').once('value')
          .then(function(snapshot) {
            const questionVotes = snapshot.val()
            const oneVotes = questionVotes.QuestionOneVotes
            const votesTotal = oneVotes[0] + oneVotes[1] + oneVotes[2] + oneVotes[3] + oneVotes[4]
            const oneVote = Math.round((oneVotes[0]/votesTotal) * 100)
            const twoVote = Math.round((oneVotes[1]/votesTotal) * 100)
            const threeVote = Math.round((oneVotes[2]/votesTotal) * 100)
            const fourVote = Math.round((oneVotes[3]/votesTotal) * 100)
            const fiveVote = Math.round((oneVotes[4]/votesTotal) * 100)
            const votes = [oneVote, twoVote, threeVote, fourVote, fiveVote]
            dispatch({
              type: "VOTES_UPDATE",
              payload: votes
            })
            dispatch({
              type: "TOTAL_VOTES",
              payload: votesTotal
            })
          })
      shareableURLMount(dispatch, "http://localhost:3000/PublicProfile/QuestionOne/" + userId)
    })
      .catch((error) => loginFail(dispatch, error.message))
  }
}

export const loginFail = (dispatch, text) => {
  dispatch({
    type: "LOGIN_FAIL",
    payload: text
  })
}

export const loginSuccess = (dispatch, user) => {
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: user
  })
}

export const loginToggle = (dispatch) => {
  dispatch({
    type: "LOGIN_TOGGLE"
  })
}

//Answer Text

export const questionOneMount = (dispatch, text) => {
  dispatch({
    type: "QUESTIONONE_MOUNT",
    payload: text
  })
}

export const questionTwoMount = (dispatch, text) => {
  dispatch({
    type: "QUESTIONTWO_MOUNT",
    payload: text
  })
}

export const questionThreeMount = (dispatch, text) => {
  dispatch({
    type: "QUESTIONTHREE_MOUNT",
    payload: text
  })
}

export const questionFourMount = (dispatch, text) => {
  dispatch({
    type: "QUESTIONFOUR_MOUNT",
    payload: text
  })
}

export const questionFiveMount = (dispatch, text) => {
  dispatch({
    type: "QUESTIONFIVE_MOUNT",
    payload: text
  })
}

export const nameMount = (dispatch, name) => {
  dispatch({
    type: "NAME_MOUNT",
    payload: name
  })
}

export const shareableURLMount = (dispatch, text) => {
  dispatch({
    type: "SHAREABLEURL_MOUNT",
    payload: text
  })
}
