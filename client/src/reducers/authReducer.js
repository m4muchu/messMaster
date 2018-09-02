import {
  SET_CURRENT_USER,
  SET_MESS_CUT,
  SET_LATE_MESS
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  date: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_MESS_CUT:
      return {
        ...state,
        date: action.payload
      };
    case SET_LATE_MESS:
      return {
        ...state,
        date: action.payload
      };
    default:
      return state;
  }
}
