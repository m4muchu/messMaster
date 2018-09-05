import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messCutHistoryReducer from './messCutHistoryReducer';

export default combineReducers({
  auth: authReducer,
  mess: messCutHistoryReducer
});
