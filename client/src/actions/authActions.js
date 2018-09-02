import { SET_CURRENT_USER } from './types';
import axios from 'axios';

export const loginUser = userData => dispatch => {
  axios
    .post('/login', userData)
    .then(res => {
      // save to local storage
      const messNumber = res.data;

      console.log(res.data);

      //set uid to local storage
      localStorage.setItem('messNumber', res.data);

      // re direct to home page
      dispatch(setCurrentUser(messNumber));
    })
    .catch(err => console.log(err));
};

// set logged user

export const setCurrentUser = messNumber => {
  return {
    type: SET_CURRENT_USER,
    payload: messNumber
  };
};
