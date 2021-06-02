import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getProjectWiseAttendance = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getProjectWiseAttendanceList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PROJECTWISE_ATTENDENCE_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PROJECTWISE_ATTENDENCE_DATA",
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

export const getProjectWiseAttendanceDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getProjectWiseAttendanceDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PROJECTWISE_ATTENDENCE_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PROJECTWISE_ATTENDENCE_DROPDOWN_DATA",
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

export const getProjectWiseAttendanceById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getProjectWiseAttendanceById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PROJECTWISE_ATTENDENCE_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PROJECTWISE_ATTENDENCE_BY_ID",
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

export const addProjectWiseAttendance = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectwiseAttendence.params;
    axios
      .post(apiEndPoints.addProjectWiseAttendance, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PROJECTWISE_ATTENDENCE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_PROJECTWISE_ATTENDENCE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getProjectWiseAttendance(params));
        }
      });
  };
};

export const deleteProjectWiseAttendance = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectwiseAttendence.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteProjectWiseAttendance, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PROJECTWISE_ATTENDENCE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_PROJECTWISE_ATTENDENCE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getProjectWiseAttendance(params));
        }
      });
  };
};
