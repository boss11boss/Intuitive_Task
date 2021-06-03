import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getPurchaseOrder = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseOrderList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_ORDER_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_ORDER_DATA",
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

export const getPurchaseOrderDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseOrderDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_ORDER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_ORDER_DROPDOWN_DATA",
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
export const addPurchaseOrder = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseOrder.params;
    axios
      .post(apiEndPoints.addPurchaseOrder, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PURCHASE_ORDER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.IndentNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_PURCHASE_ORDER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseOrder(params));
        }
      });
  };
};

export const deletePurchaseOrder = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseOrder.params;
    let IndentNo = obj.IndentNo;
    delete obj.IndentNo;
    axios
      .post(apiEndPoints.deletePurchaseOrder, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PURCHASE_ORDER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = IndentNo + " deleted Successfully";
          dispatch({
            type: "DELETE_PURCHASE_ORDER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseOrder(params));
        }
      });
  };
};
