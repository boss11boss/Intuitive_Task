const initialState = {
  data: [],
  params: null,
  VehicleTypeList: [],
  VehicleList: [],
};

const ProjectwiseAttendenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECTWISE_ATTENDENCE_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PROJECTWISE_ATTENDENCE_DROPDOWN_DATA":
      return {
        ...state,
        VehicleTypeList: action.data.VehicleTypes,
        VehicleList: action.data.Vehicles,
        error: action.error,
        params: action.params,
      };

    case "GET_PROJECTWISE_ATTENDENCE_BY_ID":
      return {
        ...state,
        selectedPROJECTWISE_ATTENDENCE: action.data,
      };

    case "ADD_PROJECTWISE_ATTENDENCE_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PROJECTWISE_ATTENDENCE_DATA":
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

export default ProjectwiseAttendenceReducer;
