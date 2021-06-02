import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getEarningMaster = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEarningMasterList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EARNING_MASTER_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EARNING_MASTER_DATA",
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

export const getEarningMasterDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEarningMasterDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EARNING_MASTER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EARNING_MASTER_DROPDOWN_DATA",
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

export const getEarningMasterById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEarningMasterById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EARNING_MASTER_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EARNING_MASTER_BY_ID",
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

export const addEarningMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    axios
      .post(apiEndPoints.addEarningMaster, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_EARNING_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_EARNING_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getEarningMaster(params));
        }
      });
  };
};

export const deleteEarningMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteEarningMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_EARNING_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_EARNING_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getEarningMaster(params));
        }
      });
  };
};
