import {
  SET_CURRENT_USER,
  SET_MESS_CUT,
  SET_LATE_MESS,
  LOGIN_USER,
  LOGIN_ERROR,
  MESS_CUT_FETCH
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  cutDate: {},
  lateMess: {},
  loading: false,
  error: false,
  messCutHistory: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case SET_MESS_CUT:
      return {
        ...state,
        cutDate: action.payload
      };
    case SET_LATE_MESS:
      return {
        ...state,
        lateMess: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      };
    case MESS_CUT_FETCH:
      return {
        ...state,
        messCutHistory: action.payload
      };
    default:
      return state;
  }
}
