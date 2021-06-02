import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getSalaryInformation = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getSalaryInformationList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_SALARY_INFORMATION_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_SALARY_INFORMATION_DATA",
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

export const getSalaryInformationDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getSalaryInformationDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_SALARY_INFORMATION_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_SALARY_INFORMATION_DROPDOWN_DATA",
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

export const getSalaryInformationById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getSalaryInformationById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_SALARY_INFORMATION_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_SALARY_INFORMATION_BY_ID",
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

export const addSalaryInformation = (obj) => {
  return (dispatch, getState) => {
    let params = getState().salaryInformation.params;
    axios
      .post(apiEndPoints.addSalaryInformation, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_SALARY_INFORMATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_SALARY_INFORMATION_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getSalaryInformation(params));
        }
      });
  };
};

export const deleteSalaryInformation = (obj) => {
  return (dispatch, getState) => {
    let params = getState().salaryInformation.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteSalaryInformation, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_SALARY_INFORMATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_SALARY_INFORMATION_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getSalaryInformation(params));
        }
      });
  };
};
