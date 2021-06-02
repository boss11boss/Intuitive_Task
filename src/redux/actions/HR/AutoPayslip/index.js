import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getAutoPayslip = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getAutoPayslipList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_AUTO_PAYSLIP_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_AUTO_PAYSLIP_DATA",
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

export const getAutoPayslipDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getAutoPayslipDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_AUTO_PAYSLIP_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_AUTO_PAYSLIP_DROPDOWN_DATA",
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

export const getAutoPayslipById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getAutoPayslipById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_AUTO_PAYSLIP_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_AUTO_PAYSLIP_BY_ID",
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

export const addAutoPayslip = (obj) => {
  return (dispatch, getState) => {
    let params = getState().autoPayslip.params;
    axios
      .post(apiEndPoints.addAutoPayslip, obj, getHeaders) 

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_AUTO_PAYSLIP_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_AUTO_PAYSLIP_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getAutoPayslip(params));
        }
      });
  };
};

export const deleteAutoPayslip = (obj) => {
  return (dispatch, getState) => {
    let params = getState().autoPayslip.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteAutoPayslip, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_AUTO_PAYSLIP_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_AUTO_PAYSLIP_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getAutoPayslip(params));
        }
      });
  };
};
