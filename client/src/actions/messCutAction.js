import { MESS_CUT_FETCH } from './types';
import axios from 'axios';

export const messCutFetch = messNumber => dispatch => {
  console.log('mess number', messNumber);
  axios
    .post('/getmesscut', { messNumber: messNumber })
    .then(res => {
      //console.log('messCutFetch', res.data);
      dispatch({
        type: MESS_CUT_FETCH,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
