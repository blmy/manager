//Synchronous vs asynchronous:
//Ajax(synchronous) - returns instantly without waiting for result.
//We need to authenticate user with firebase thus we need to wait for result.
//Solution, redux Thunk (npm module which we need to install).
//npm install --save redux-thunk.

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';//navigation
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED, //type is defined in types.js
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

//authentication with firebase and Thunk
//Thunk is use to handle any type of asynchronous action creator/ajax request
export const loginUser = ({ email, password }) => {
  return (dispatch) => { //redux-thunk dispatch
    dispatch({ type: LOGIN_USER });

    //asynchronous action, we cannot immediately return an action.
    //verifying user.
    firebase.auth().signInWithEmailAndPassword(email, password)
      //once the result is back, we dispatch action.
      //pass along the dispatch method and user (user is result returned).
      .then(user => loginUserSucess(dispatch, user))
      .catch((error) => {
        //for checking of errors, debugging. To remove when deploying app.
        console.log(error);

        //creating new user if user login failed.
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSucess(dispatch, user))
          //login fail
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSucess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  //navigate to employeeList; key for Scene tag.
  Actions.main();
};
