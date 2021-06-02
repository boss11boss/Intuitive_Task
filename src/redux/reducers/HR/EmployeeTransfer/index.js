const initialState = {
  data: [],
  params: null,
  VehicleTypeList: [],
  VehicleList: [],
};

const EmployeeTransferReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_TRANSFER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_EMPLOYEE_TRANSFER_DROPDOWN_DATA":
      return {
        ...state,
        VehicleTypeList: action.data.VehicleTypes,
        VehicleList: action.data.Vehicles,
        error: action.error,
        params: action.params,
      };

    case "GET_EMPLOYEE_TRANSFER_BY_ID":
      return {
        ...state,
        selectedEMPLOYEE_TRANSFER: action.data,
      };

    case "ADD_EMPLOYEE_TRANSFER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_EMPLOYEE_TRANSFER_DATA":
      return {
        ...state,
        successMsg: action.successMsg,
        error: action.error,
        random: action.random,
      };

    default:
      return state;
  }
};

export default EmployeeTransferReducer;
