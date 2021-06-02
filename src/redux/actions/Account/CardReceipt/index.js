import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getCardReceipt = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCardReceiptList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CARD_RECEIPT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CARD_RECEIPT_DATA",
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

export const getCardReceiptDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCardReceiptDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CARD_RECEIPT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CARD_RECEIPT_DROPDOWN_DATA",
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

export const getCardReceiptById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCardReceiptById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CARD_RECEIPT_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CARD_RECEIPT_BY_ID",
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

export const getCardReceiptAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCardReceiptAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CARD_RECEIPT_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CARD_RECEIPT_ATTACHMENT",
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

// export const addCardReceipt = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().cardReceipt.params;
//     axios
//       .post(apiEndPoints.addCardReceipt, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_CARD_RECEIPT_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.Code + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_CARD_RECEIPT_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getCardReceipt(params));
//         }
//       });
//   };
// };

export const addCardReceipt = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cardReceipt.params;
    axios
      .post(apiEndPoints.addCardReceipt, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CARD_RECEIPT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addCardReceiptAttchment({
                IDNumber: response.data.Data.IDNumber,
                file: obj.file,
                CreatedBy:
                  localStorage.getItem("userData") &&
                  JSON.parse(localStorage.getItem("userData")).IDNumber,
                CreatedDate: moment(),
                UpdatedBy:
                  localStorage.getItem("userData") &&
                  JSON.parse(localStorage.getItem("userData")).IDNumber,
                UpdatedDate: moment(),
              })
            );
          } else {
            let successMsg = "Added Successfully";
            if (obj.IDNumber) {
              successMsg = obj.Code + " updated Successfully";
            }
            dispatch({
              type: "ADD_CARD_RECEIPT_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getCardReceipt(params));
          }
        }
      });
  };
};

export const addCardReceiptAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cardReceipt.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addCardReceiptAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CARD_RECEIPT_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_CARD_RECEIPT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCardReceipt(params));
        }
      });
  };
};

export const deleteCardReceipt = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cardReceipt.params;
    let Code = obj.Code;
    delete obj.Code;
    axios
      .post(apiEndPoints.deleteCardReceipt, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_CARD_RECEIPT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Code + " deleted Successfully";
          dispatch({
            type: "DELETE_CARD_RECEIPT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCardReceipt(params));
        }
      });
  };
};
