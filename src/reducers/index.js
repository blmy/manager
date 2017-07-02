import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';

export default combineReducers({
  //defaut reducer for the boilerplate to work
  //whatever: () => []
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer
});
