import { MESS_CUT_FETCH } from '../actions/types';

const initialState = {
  messCutHistory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MESS_CUT_FETCH:
      return {
        ...state,
        messCutHistory: action.payload
      };
    default:
      return state;
  }
}
