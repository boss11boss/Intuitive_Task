const initialState = {
  data: [],
  params: null,
  VehicleTypeList: [],
  VehicleList: [],
};

const SalaryInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SALARY_INFORMATION_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_SALARY_INFORMATION_DROPDOWN_DATA":
      return {
        ...state,
        VehicleTypeList: action.data.VehicleTypes,
        VehicleList: action.data.Vehicles,
        error: action.error,
        params: action.params,
      };

    case "GET_SALARY_INFORMATION_BY_ID":
      return {
        ...state,
        selectedSALARY_INFORMATION: action.data,
      };

    case "ADD_SALARY_INFORMATION_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_SALARY_INFORMATION_DATA":
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

export default SalaryInformationReducer;
