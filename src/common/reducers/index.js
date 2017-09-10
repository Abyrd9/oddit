import {combineReducers} from 'redux';

import userAuth from './userReducer';
import questionState from './questionReducer';
import publicProfileState from './publicProfileReducer';

export default combineReducers({
  userAuth,
  questionState,
  publicProfileState
})
