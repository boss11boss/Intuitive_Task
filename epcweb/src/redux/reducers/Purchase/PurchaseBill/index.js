const initialState = {
  data: [],
  params: null,
  projectList: [],
  locationList: [],
  itemList: [],
  unitList: [],
  supplierList: [],
  purchaseOrderList: [],
};

const PurchaseBillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PURCHASE_BILL_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_BILL_DROPDOWN_DATA":
      return {
        ...state,
        projectList: action.data.Projects,
        locationList: action.data.Locations,
        itemList: action.data.Items,
        unitList: action.data.Units,
        supplierList: action.data.Suppliers,
        purchaseOrderList: action.data.PurchaseOrders,
        inwList: action.data.INWDetails,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_BILL_BY_ID":
      return {
        ...state,
        selectedPURCHASE_BILL: action.data,
      };

    case "ADD_PURCHASE_BILL_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PURCHASE_BILL_DATA":
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

export default PurchaseBillReducer;
