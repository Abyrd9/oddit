const INITIAL_STATE = {
  loggedIn: false,
  email: '',
  password: '',
  name: '',
  user: '',
  signupFail: '',
  error: '',
  authPage: 'SignIn',
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "EMAIL_CHANGE":
      return {...state, email: action.payload, error: ''}
    case "PASS_CHANGE":
      return {...state, password: action.payload, error: ''}
    case "NAME_CHANGE":
      return {...state, name: action.payload, error: ''}
    case "SIGNUP_FAIL":
      return {...state, error: action.payload}
    case "LOGIN_FAIL":
      return {...state, error: action.payload}
    case "TOGGLE_SIGNIN":
      return {...state, authPage: 'SignIn', email: '', password: '', name: '', error: ''}
    case "TOGGLE_SIGNUP":
      return {...state, authPage: 'SignUp', email: '', password: '', name: '', error: ''}
    case "LOGIN_SUCCESS":
      return {...state, user: action.payload}
    case "LOGIN_TOGGLE":
      return {...state, loggedIn: true}
    case "SIGNUP_SUCCESS":
      return {...state, loggedIn: true, user: action.payload}
    case "NAME_MOUNT":
      return {...state, name: action.payload}
    default:
      return state;
  }
}
