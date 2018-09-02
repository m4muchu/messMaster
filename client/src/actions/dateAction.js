import { SET_MESS_CUT, SET_LATE_MESS } from './types';

import axios from 'axios';

export const messCut = data => dispatch => {
  axios
    .post('/messcut', data)
    .then(res => {
      console.log('action', res.data);

      dispatch({
        type: SET_MESS_CUT,
        payload: res.data.message
      });
    })
    .catch(err => console.log(err));
};

export const lateMess = data => dispatch => {
  axios.post('/latemess', data).then(res => {
    console.log('latemess', res.data);
    dispatch({
      type: SET_LATE_MESS,
      payload: res.data.message
    });
  });
};
