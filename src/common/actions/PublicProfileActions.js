import firebase from 'firebase';

export const publicProfileMount = (userId) => {
  return dispatch => {
    console.log(userId)
    dispatch({
      type: "SET_ID",
      payload: userId
    })
    firebase.auth().signInAnonymously()
      .then(() => {
        const userDatabase = firebase.database()
        userDatabase.ref('/users/' + userId + '/questionAnswers').once('value')
          .then(function(snapshot) {
            const questionText = snapshot.val()
            questionOneMount(dispatch, questionText.QuestionOneText)
            questionTwoMount(dispatch, questionText.QuestionTwoText)
            questionThreeMount(dispatch, questionText.QuestionThreeText)
            questionFourMount(dispatch, questionText.QuestionFourText)
            questionFiveMount(dispatch, questionText.QuestionFiveText)
          })
        userDatabase.ref('/users/' + userId + '/info').once('value')
          .then(function(snapshot) {
            const name = snapshot.val()
            nameMount(dispatch, name.name)
          })
        userDatabase.ref('/users/' + userId + '/questionVotes').once('value')
          .then(function(snapshot) {
            const votes = snapshot.val();
            if (votes === null) {
              null
            } else {
              null
            }
          })
      })
      .catch((error) => console.log(error.message))
  }
}

export const updateVoteClicked = (
  currentPage,
  voteNumber,
  Saved,
  userId,
) => {
  return dispatch => {
      if (currentPage === 'one') {
        voteOneUpdate(dispatch, voteNumber)
        voteOneSave(dispatch, Saved)
      } else if (currentPage === 'two') {
        voteTwoUpdate(dispatch, voteNumber)
        voteTwoSave(dispatch, Saved)
      } else if (currentPage === 'three') {
        voteThreeUpdate(dispatch, voteNumber)
        voteThreeSave(dispatch, Saved)
      } else if (currentPage === 'four') {
        voteFourUpdate(dispatch, voteNumber)
        voteFourSave(dispatch, Saved)
      } else if (currentPage === 'five') {
        voteFiveUpdate(dispatch, voteNumber)
        voteFiveSave(dispatch, Saved)
      }
  }
}

export const submitVotes = (OneVote, TwoVote, ThreeVote, FourVote, FiveVote, userId) => {
  return dispatch => {
    firebase.database().ref('/users/' + userId + '/questionVotes').once('value')
      .then(function(snapshot) {
        const allVotes = snapshot.val();
        const oneVotes = [allVotes.QuestionOneVotes[0], allVotes.QuestionOneVotes[1], allVotes.QuestionOneVotes[2], allVotes.QuestionOneVotes[3], allVotes.QuestionOneVotes[4]];
        const twoVotes = [allVotes.QuestionTwoVotes[0], allVotes.QuestionTwoVotes[1], allVotes.QuestionTwoVotes[2], allVotes.QuestionTwoVotes[3], allVotes.QuestionTwoVotes[4]];
        const threeVotes = [allVotes.QuestionThreeVotes[0], allVotes.QuestionThreeVotes[1], allVotes.QuestionThreeVotes[2], allVotes.QuestionThreeVotes[3], allVotes.QuestionThreeVotes[4]];
        const fourVotes = [allVotes.QuestionFourVotes[0], allVotes.QuestionFourVotes[1], allVotes.QuestionFourVotes[2], allVotes.QuestionFourVotes[3], allVotes.QuestionFourVotes[4]];
        const fiveVotes = [allVotes.QuestionFiveVotes[0], allVotes.QuestionFiveVotes[1], allVotes.QuestionFiveVotes[2], allVotes.QuestionFiveVotes[3], allVotes.QuestionFiveVotes[4]];

        const oneUpdate = () => {
          for (let i = 0; i < oneVotes.length; i++) {
            if (i === OneVote) {
              oneVotes[OneVote] = oneVotes[OneVote]+1;
              let votes = oneVotes
              return {QuestionOneVotes: votes}
            }
          }
        }

        const twoUpdate = () => {
          for (let i = 0; i < twoVotes.length; i++) {
            if (i === TwoVote) {
              twoVotes[TwoVote] = twoVotes[TwoVote]+1;
              let votes = twoVotes
              return {QuestionTwoVotes: votes}
            }
          }
        }

        const threeUpdate = () => {
          for (let i = 0; i < threeVotes.length; i++) {
            if (i === ThreeVote) {
              threeVotes[ThreeVote] = threeVotes[ThreeVote]+1;
              let votes = threeVotes
              return {QuestionThreeVotes: votes}
            }
          }
        }

        const fourUpdate = () => {
          for (let i = 0; i < fourVotes.length; i++) {
            if (i === FourVote) {
              fourVotes[FourVote] = fourVotes[FourVote]+1;
              let votes = fourVotes
              return {QuestionFourVotes: votes}
            }
          }
        }

        const fiveUpdate = () => {
          for (let i = 0; i < fourVotes.length; i++) {
            if (i === FiveVote) {
              fiveVotes[FiveVote] = fiveVotes[FourVote]+1;
              let votes = fiveVotes
              return {QuestionFiveVotes: votes}
            }
          }
        }

        firebase.database().ref('/users/' + userId + '/questionVotes/').update(oneUpdate())
        firebase.database().ref('/users/' + userId + '/questionVotes/').update(twoUpdate())
        firebase.database().ref('/users/' + userId + '/questionVotes/').update(threeUpdate())
        firebase.database().ref('/users/' + userId + '/questionVotes/').update(fourUpdate())
        firebase.database().ref('/users/' + userId + '/questionVotes').update(fiveUpdate())

      })

    dispatch({
      type: "SUBMIT",
      payload: true
    })
  }
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

// votes

export const voteOneUpdate = (dispatch, vote) => {
  dispatch({
    type: "QUESTION_ONE_VOTE",
    payload: vote
  })
}

export const voteTwoUpdate = (dispatch, vote) => {
  dispatch({
    type: "QUESTION_TWO_VOTE",
    payload: vote
  })
}

export const voteThreeUpdate = (dispatch, vote) => {
  dispatch({
    type: "QUESTION_THREE_VOTE",
    payload: vote
  })
}

export const voteFourUpdate = (dispatch, vote) => {
  dispatch({
    type: "QUESTION_FOUR_VOTE",
    payload: vote
  })
}

export const voteFiveUpdate = (dispatch, vote) => {
  dispatch({
    type: "QUESTION_FIVE_VOTE",
    payload: vote
  })
}

export const updatePrevVotes = (
  PrevOneVote,
  PrevTwoVote,
  PrevThreeVote,
  PrevFourVote,
  PrevFiveVote,
  currentPage
) => {
  return dispatch => {
    if (currentPage === "one") {
      dispatch({
        type: "PREV_ONE_VOTE",
        payload: PrevOneVote
      })
    } else if (currentPage === "two") {
      dispatch({
        type: "PREV_TWO_VOTE",
        payload: PrevTwoVote
      })
    } else if (currentPage === "three") {
      dispatch({
        type: "PREV_THREE_VOTE",
        payload: PrevThreeVote
      })
    } else if (currentPage === "four") {
      dispatch({
        type: "PREV_FOUR_VOTE",
        payload: PrevFourVote
      })
    } else if (currentPage === "five") {
      dispatch({
        type: "PREV_FIVE_VOTE",
        payload: PrevFiveVote
      })
    } else {
      console.log('Did not work!')
      null
    }
  }
}

// Vote Saves

export const voteOneSave = (dispatch, save) => {
  dispatch({
    type: "QUESTION_ONE_VOTE_SAVE",
    payload: save
  })
}

export const voteTwoSave = (dispatch, save) => {
  dispatch({
    type: "QUESTION_TWO_VOTE_SAVE",
    payload: save
  })
}

export const voteThreeSave = (dispatch, save) => {
  dispatch({
    type: "QUESTION_THREE_VOTE_SAVE",
    payload: save
  })
}

export const voteFourSave = (dispatch, save) => {
  dispatch({
    type: "QUESTION_FOUR_VOTE_SAVE",
    payload: save
  })
}

export const voteFiveSave = (dispatch, save) => {
  dispatch({
    type: "QUESTION_FIVE_VOTE_SAVE",
    payload: save
  })
}

export const submitActiveChange = (value) => {
  return {
    type: "SUBMIT_ACTIVE",
    payload: value
  }
}
