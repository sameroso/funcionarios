import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import selectedEmployeeReducer from "./selectedEmployeeReducer";
import userReducer from "./userReducer";

export default combineReducers({
  employees: employeeReducer,
  selectedEmployee: selectedEmployeeReducer,
  user: userReducer,
});
