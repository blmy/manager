import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  //get current authenticated user
  const { currentUser } = firebase.auth();
  //firebase.database: get access to firebase database.
  //ref(): make a reference to path JSON database ref('/users/userID/employees').
  //The result of the actual code will look like this ref(`/users/123456/employees`).
  //After running this line "firebase.database().ref(`/users/${currentUser}.uid/employees`)",
  //you are now in the authenticated user database of the specified location.
  //.push({  }): anything inside this will be save to the database of the specified location.
  //Actions.employeeList: is a navigation, type reset is to reset the entire view stack.
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    //.on(): anytime a data/value comes cross this ref(), call this function snapshot => {}
    //with an object to describe the data sitting in there, the object is snapshot.
    //At any point of time in the life cycle of the app, whenever we get a new data,
    //we dispatch an action.
    //snapshot.val(): this is how we get access to the data in ref().
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: EMPLOYEE_DELETE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};
