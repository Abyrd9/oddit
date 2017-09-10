import firebase from 'firebase';

export const questionRender = (number, questionText, questionSaved) => {
  return dispatch => {
    console.log(number)
    if (number === 1) {
      liveQuestionText(dispatch, questionText[0])
      liveQuestionSaved(dispatch, questionSaved[0])
      dispatch({
        type: "QUESTIONTITLE_CHANGE",
        payload: "How would you want others to describe you?"
      })
      dispatch({
        type: "CURRENT_PAGE",
        payload: "one"
      })
      console.log(questionText[0], questionSaved[0])
    } else if (number === 2) {
      liveQuestionText(dispatch, questionText[1])
      liveQuestionSaved(dispatch, questionSaved[1])
      dispatch({
        type: "QUESTIONTITLE_CHANGE",
        payload: "What are your biggest strengths?"
      })
      dispatch({
        type: "CURRENT_PAGE",
        payload: "two"
      })
      console.log(questionText[1], questionSaved[1])
    } else if (number === 3) {
      liveQuestionText(dispatch, questionText[2])
      liveQuestionSaved(dispatch, questionSaved[2])
      dispatch({
        type: "QUESTIONTITLE_CHANGE",
        payload: "What are your biggest weaknesses?"
      })
      dispatch({
        type: "CURRENT_PAGE",
        payload: "three"
      })
      console.log(questionText[2], questionSaved[2])
    } else if (number === 4) {
      liveQuestionText(dispatch, questionText[3])
      liveQuestionSaved(dispatch, questionSaved[3])
      dispatch({
        type: "QUESTIONTITLE_CHANGE",
        payload: "Describe your ideal self."
      })
      dispatch({
        type: "CURRENT_PAGE",
        payload: "four"
      })
      console.log(questionText[3], questionSaved[3])
    } else if (number === 5) {
      liveQuestionText(dispatch, questionText[4])
      liveQuestionSaved(dispatch, questionSaved[4])
      dispatch({
        type: "QUESTIONTITLE_CHANGE",
        payload: "Do you think you will achieve your goals? Why?"
      })
      dispatch({
        type: "CURRENT_PAGE",
        payload: "five"
      })
      console.log(questionText[4], questionSaved[4])
    }
  }
}

export const liveQuestionText = (dispatch, text) => {
  dispatch({
    type: "LIVE_QUESTION",
    payload: text
  })
}

export const liveQuestionSaved = (dispatch, saved) => {
  dispatch({
    type: "LIVE_SAVED",
    payload: saved
  })
}

export const questionChange = (number, text) => {
  return dispatch => {
    console.log(number)
    dispatch({
      type: "LIVE_QUESTION",
      payload: text
    })
    individualQuestionChanges(dispatch, number, text)
  }
}

export const individualQuestionChanges = (dispatch, number, text) => {
  if (number === 1) {
    dispatch({
      type: "QUESTIONONE_CHANGE",
      payload: text
    })
  } else if (number === 2) {
    dispatch({
      type: "QUESTIONTWO_CHANGE",
      payload: text
    })
  } else if (number === 3) {
    dispatch({
      type: "QUESTIONTHREE_CHANGE",
      payload: text
    })
  } else if (number === 4) {
    dispatch({
      type: "QUESTIONFOUR_CHANGE",
      payload: text
    })
  } else if (number === 5) {
    dispatch({
      type: "QUESTIONFIVE_CHANGE",
      payload: text
    })
  }
}

export const questionSave = (number, text) => {
  return dispatch => {
    console.log(number)
    const userId = firebase.auth().currentUser.uid;
    if (number === 1) {
      const QuestionOneText = text;
      firebase.database().ref('/users/' + userId + '/questionAnswers').update({QuestionOneText})
      dispatch({
        type: "ONE_SAVED"
      })
    } else if (number === 2) {
      const QuestionTwoText = text;
      firebase.database().ref('/users/' + userId + '/questionAnswers').update({QuestionTwoText})
      dispatch({
        type: "TWO_SAVED"
      })
    } else if (number === 3) {
      const QuestionThreeText = text;
      firebase.database().ref('/users/' + userId + '/questionAnswers').update({QuestionThreeText})
      dispatch({
        type: "THREE_SAVED"
      })
    } else if (number === 4) {
      const QuestionFourText = text;
      firebase.database().ref('/users/' + userId + '/questionAnswers').update({QuestionFourText})
      dispatch({
        type: "FOUR_SAVED"
      })
    } else if (number === 5) {
      const QuestionFiveText = text;
      firebase.database().ref('/users/' + userId + '/questionAnswers').update({QuestionFiveText})
      dispatch({
        type: "FIVE_SAVED"
      })
    }
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
  }
}

export const shareClicked = (toggle) => {
  return {
    type: "SHARE_PROFILE",
    payload: toggle
  }
}

export const votesUpdate = (currentPage, userId) => {
  return dispatch => {

    firebase.database().ref('/users/' + userId + '/questionVotes').once('value')
      .then(function(snapshot) {
        const questionVotes = snapshot.val()
        const oneVotes = questionVotes.QuestionOneVotes
        const twoVotes = questionVotes.QuestionTwoVotes
        const threeVotes = questionVotes.QuestionThreeVotes
        const fourVotes = questionVotes.QuestionFourVotes
        const fiveVotes = questionVotes.QuestionFiveVotes

        if (currentPage === "one") {
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
        } else if (currentPage === "two") {
          const votesTotal = twoVotes[0] + twoVotes[1] + twoVotes[2] + twoVotes[3] + twoVotes[4]
          const oneVote = Math.round((twoVotes[0]/votesTotal) * 100)
          const twoVote = Math.round((twoVotes[1]/votesTotal) * 100)
          const threeVote = Math.round((twoVotes[2]/votesTotal) * 100)
          const fourVote = Math.round((twoVotes[3]/votesTotal) * 100)
          const fiveVote = Math.round((twoVotes[4]/votesTotal) * 100)
          const votes = [oneVote, twoVote, threeVote, fourVote, fiveVote]
          dispatch({
            type: "VOTES_UPDATE",
            payload: votes
          })
          dispatch({
            type: "TOTAL_VOTES",
            payload: votesTotal
          })
        } else if (currentPage === "three") {
          const votesTotal = threeVotes[0] + threeVotes[1] + threeVotes[2] + threeVotes[3] + threeVotes[4]
          const oneVote = Math.round((threeVotes[0]/votesTotal) * 100)
          const twoVote = Math.round((threeVotes[1]/votesTotal) * 100)
          const threeVote = Math.round((threeVotes[2]/votesTotal) * 100)
          const fourVote = Math.round((threeVotes[3]/votesTotal) * 100)
          const fiveVote = Math.round((threeVotes[4]/votesTotal) * 100)
          const votes = [oneVote, twoVote, threeVote, fourVote, fiveVote]
          dispatch({
            type: "VOTES_UPDATE",
            payload: votes
          })
          dispatch({
            type: "TOTAL_VOTES",
            payload: votesTotal
          })
        } else if (currentPage === "four") {
          const votesTotal = fourVotes[0] + fourVotes[1] + fourVotes[2] + fourVotes[3] + fourVotes[4]
          const oneVote = Math.round((fourVotes[0]/votesTotal) * 100)
          const twoVote = Math.round((fourVotes[1]/votesTotal) * 100)
          const threeVote = Math.round((fourVotes[2]/votesTotal) * 100)
          const fourVote = Math.round((fourVotes[3]/votesTotal) * 100)
          const fiveVote = Math.round((fourVotes[4]/votesTotal) * 100)
          const votes = [oneVote, twoVote, threeVote, fourVote, fiveVote]
          dispatch({
            type: "VOTES_UPDATE",
            payload: votes
          })
          dispatch({
            type: "TOTAL_VOTES",
            payload: votesTotal
          })
        } else if (currentPage === "five") {
          const votesTotal = fiveVotes[0] + fiveVotes[1] + fiveVotes[2] + fiveVotes[3] + fiveVotes[4]
          const oneVote = Math.round((fiveVotes[0]/votesTotal) * 100)
          const twoVote = Math.round((fiveVotes[1]/votesTotal) * 100)
          const threeVote = Math.round((fiveVotes[2]/votesTotal) * 100)
          const fourVote = Math.round((fiveVotes[3]/votesTotal) * 100)
          const fiveVote = Math.round((fiveVotes[4]/votesTotal) * 100)
          const votes = [oneVote, twoVote, threeVote, fourVote, fiveVote]
          dispatch({
            type: "VOTES_UPDATE",
            payload: votes
          })
          dispatch({
            type: "TOTAL_VOTES",
            payload: votesTotal
          })
        }
      })
  }
}
