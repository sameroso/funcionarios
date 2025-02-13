import axios from "axios";

export const getEmployeeList = (googleId) => async (dispatch) => {
  const response = await axios.get(`https://seidor.herokuapp.com/api/${googleId}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const saveEmployee = (formValues, googleId) => async (dispatch) => {
  const response = await axios.post("https://seidor.herokuapp.com/api", {...formValues, user:googleId});
  dispatch({ type: "SAVE_USER", payload: response.data });
};

export const deleteEmployee = (id) => async (dispatch) => {
  const response = await axios.delete(`https://seidor.herokuapp.com/api/${id}`);
  dispatch({ type: "DELETE_USER", payload: response.data });
};

export const editEmployee = (formValues) => async (dispatch) => {
  const response = await axios.patch("https://seidor.herokuapp.com/api/", formValues);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const selectEmployee = (employeeData) => {
  return { type: "SELECT_USER", payload: employeeData };
};

export const userLogin = (userData) => {
  return { type: "LOGIN_USER", payload: userData };
};