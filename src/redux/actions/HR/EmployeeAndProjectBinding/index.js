import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getEmployeeAndProjectBinding = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEmployeeAndProjectBindingList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMPLOYEE_PROJECT_BINDING_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMPLOYEE_PROJECT_BINDING_DATA",
              data: response.data.Data,
              totalPages: response.data.totalPages,
              params,
            });
          }
        },
        (error) => {}
      );
  };
};

export const getEmployeeAndProjectBindingDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(
        apiEndPoints.getEmployeeAndProjectBindingDropDown,
        params,
        getHeaders
      )
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMPLOYEE_PROJECT_BINDING_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMPLOYEE_PROJECT_BINDING_DROPDOWN_DATA",
              data: response.data.Data,
              totalPages: response.data.totalPages,
              params,
            });
          }
        },
        (error) => {}
      );
  };
};

export const getEmployeeAndProjectBindingById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEmployeeAndProjectBindingById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMPLOYEE_PROJECT_BINDING_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMPLOYEE_PROJECT_BINDING_BY_ID",
              data: response.data.Data,
              totalPages: response.data.totalPages,
              params,
            });
          }
        },
        (error) => {}
      );
  };
};

export const addEmployeeAndProjectBinding = (obj) => {
  return (dispatch, getState) => {
    let params = getState().employeeAndProjectBinding.params;
    axios
      .post(apiEndPoints.addEmployeeAndProjectBinding, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_EMPLOYEE_PROJECT_BINDING_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_EMPLOYEE_PROJECT_BINDING_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getEmployeeAndProjectBinding(params));
        }
      });
  };
};

export const deleteEmployeeAndProjectBinding = (obj) => {
  return (dispatch, getState) => {
    let params = getState().employeeAndProjectBinding.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteEmployeeAndProjectBinding, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_EMPLOYEE_PROJECT_BINDING_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_EMPLOYEE_PROJECT_BINDING_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getEmployeeAndProjectBinding(params));
        }
      });
  };
};
