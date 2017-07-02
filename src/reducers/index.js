import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  //defaut reducer for the boilerplate to work
  //whatever: () => []
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  //employees piece of state comes from EMployeeReducer
  employees: EmployeeReducer
});
