import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
    //action.payload === { prop: 'name', value: 'Jane' }
    //[] is not an array, it is key interpolation
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
    //upon successful employee creation,
    //reset the employee create form to INITIAL_STATE which is empty
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
     return INITIAL_STATE;
    case EMPLOYEE_DELETE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
