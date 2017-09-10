const INITIAL_STATE = {
  OneVote: null,
  TwoVote: null,
  ThreeVote: null,
  FourVote: null,
  FiveVote: null,
  PrevOneVote: null,
  PrevTwoVote: null,
  PrevThreeVote: null,
  PrevFourVote: null,
  PrevFiveVote: null,
  OneVoteSaved: false,
  TwoVoteSaved: false,
  ThreeVoteSaved: false,
  FourVoteSaved: false,
  FiveVoteSaved: false,
  publicId: "",
  submitActive: false,
  submitted: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "QUESTION_ONE_VOTE":
      return {...state, OneVote: action.payload}
    case "QUESTION_TWO_VOTE":
      return {...state, TwoVote: action.payload}
    case "QUESTION_THREE_VOTE":
      return {...state, ThreeVote: action.payload}
    case "QUESTION_FOUR_VOTE":
      return {...state, FourVote: action.payload}
    case "QUESTION_FIVE_VOTE":
      return {...state, FiveVote: action.payload}
    case "QUESTION_ONE_VOTE_SAVE":
      return {...state, OneVoteSaved: action.payload}
    case "QUESTION_TWO_VOTE_SAVE":
      return {...state, TwoVoteSaved: action.payload}
    case "QUESTION_THREE_VOTE_SAVE":
      return {...state, ThreeVoteSaved: action.payload}
    case "QUESTION_FOUR_VOTE_SAVE":
      return {...state, FourVoteSaved: action.payload}
    case "QUESTION_FIVE_VOTE_SAVE":
      return {...state, FiveVoteSaved: action.payload}
    case "SET_ID":
      return {...state, publicId: action.payload}
    case "PREV_ONE_VOTE":
      return {...state, PrevOneVote: action.payload}
    case "PREV_TWO_VOTE":
      return {...state, PrevTwoVote: action.payload}
    case "PREV_THREE_VOTE":
      return {...state, PrevThreeVote: action.payload}
    case "PREV_FOUR_VOTE":
      return {...state, PrevFourVote: action.payload}
    case "PREV_FIVE_VOTE":
      return {...state, PrevFiveVote: action.payload}
    case "SUBMIT_ACTIVE":
      return {...state, submitActive: action.payload}
    case "SUBMIT":
      return {...state, submitted: action.payload}
    default:
      return state;
  }
}
