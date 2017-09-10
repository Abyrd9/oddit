const INITIAL_STATE = {
    liveText: '',
    liveSaved: true,
    liveQuestionTitle: "How would you want others to describe you?",
    QuestionOne: '',
    QuestionTwo: '',
    QuestionThree: '',
    QuestionFour: '',
    QuestionFive: '',
    OneSaved: true,
    TwoSaved: true,
    ThreeSaved: true,
    FourSaved: true,
    FiveSaved: true,
    shareable: false,
    shareClickedToggle: false,
    modalInputValue: "",
    currentPage: "one",
    publicVotes: [],
    totalVotes: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "QUESTIONONE_MOUNT":
      return {...state, QuestionOne: action.payload, liveText: action.payload}
    case "QUESTIONTWO_MOUNT":
      return {...state, QuestionTwo: action.payload}
    case "QUESTIONTHREE_MOUNT":
      return {...state, QuestionThree: action.payload}
    case "QUESTIONFOUR_MOUNT":
      return {...state, QuestionFour: action.payload}
    case "QUESTIONFIVE_MOUNT":
      return {...state, QuestionFive: action.payload}
    case "QUESTIONONE_CHANGE":
      return {...state, QuestionOne: action.payload, OneSaved: false, liveSaved: false}
    case "QUESTIONTWO_CHANGE":
      return {...state, QuestionTwo: action.payload, TwoSaved: false, liveSaved: false}
    case "QUESTIONTHREE_CHANGE":
      return {...state, QuestionThree: action.payload, ThreeSaved: false, liveSaved: false}
    case "QUESTIONFOUR_CHANGE":
      return {...state, QuestionFour: action.payload, FourSaved: false, liveSaved: false}
    case "QUESTIONFIVE_CHANGE":
      return {...state, QuestionFive: action.payload, FiveSaved: false, liveSaved: false}
    case "ONE_SAVED":
      return {...state, OneSaved: true, liveSaved: true}
    case "TWO_SAVED":
      return {...state, TwoSaved: true, liveSaved: true}
    case "THREE_SAVED":
      return {...state, ThreeSaved: true, liveSaved: true}
    case "FOUR_SAVED":
      return {...state, FourSaved: true, liveSaved: true}
    case "FIVE_SAVED":
      return {...state, FiveSaved: true, liveSaved: true}
    case "LIVE_QUESTION":
      return {...state, liveText: action.payload, shareable: false}
    case "LIVE_SAVED":
      return {...state, liveSaved: action.payload}
    case "QUESTIONTITLE_CHANGE":
      return {...state, liveQuestionTitle: action.payload}
    case "SHAREABLE_PROFILE":
      return {...state, shareable: true}
    case "SHARE_PROFILE":
      return {...state, shareClickedToggle: action.payload}
    case "SHAREABLEURL_MOUNT":
      return {...state, modalInputValue: action.payload}
    case "CURRENT_PAGE":
      return {...state, currentPage: action.payload}
    case "VOTES_UPDATE":
      return {...state, publicVotes: action.payload}
    case "TOTAL_VOTES":
      return {...state, totalVotes: action.payload}
    default:
      return state;
  }
}
