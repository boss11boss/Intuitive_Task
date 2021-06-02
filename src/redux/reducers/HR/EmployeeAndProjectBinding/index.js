const initialState = {
  data: [],
  params: null,
  VehicleTypeList: [],
  VehicleList: [],
};

const EmployeeProjectBindingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_PROJECT_BINDING_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_EMPLOYEE_PROJECT_BINDING_DROPDOWN_DATA":
      return {
        ...state,
        VehicleTypeList: action.data.VehicleTypes,
        VehicleList: action.data.Vehicles,
        error: action.error,
        params: action.params,
      };

    case "GET_EMPLOYEE_PROJECT_BINDING_BY_ID":
      return {
        ...state,
        selectedEMPLOYEE_PROJECT_BINDING: action.data,
      };

    case "ADD_EMPLOYEE_PROJECT_BINDING_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_EMPLOYEE_PROJECT_BINDING_DATA":
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

export default EmployeeProjectBindingReducer;
