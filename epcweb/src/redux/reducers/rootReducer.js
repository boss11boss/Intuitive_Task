import { combineReducers } from "redux";
import calenderReducer from "./calendar/";
import emailReducer from "./email/";
import chatReducer from "./chat/";
import todoReducer from "./todo/";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import dataList from "./data-list/";
import roleReducer from "./Administration/role";
import SupplierReducer from "./Administration/supplier";
import CountryReducer from "./Administration/country";
import StateReducer from "./Administration/state";
import DistrictReducer from "./Administration/district";
import CityReducer from "./Administration/city";
import DesignationReducer from "./Administration/designation";
import UserReducer from "./Administration/user";
import EmployeeReducer from "./Administration/employee";
import ProjectReducer from "./Administration/project";
import LocationReducer from "./Administration/location";
import RoomReducer from "./Administration/room";
import CardReducer from "./Administration/card";
import ItemReducer from "./Administration/item";
import VehicleReducer from "./Administration/vehicle";
import PurchaseIndentReducer from "./Purchase/PurchaseIndent";
import PurchaseOrderReducer from "./Purchase/PurchaseOrder";
import GRNReducer from "./Purchase/GRN";
import PurchaseBillReducer from "./Purchase/PurchaseBill";

const rootReducer = combineReducers({
  calendar: calenderReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataList: dataList,
  country: CountryReducer,
  state: StateReducer,
  district: DistrictReducer,
  city: CityReducer,
  designation: DesignationReducer,
  roles: roleReducer,
  user: UserReducer,
  employee: EmployeeReducer,
  project: ProjectReducer,
  location: LocationReducer,
  room: RoomReducer,
  card: CardReducer,
  item: ItemReducer,
  vehicle: VehicleReducer,
  supplier: SupplierReducer,
  purchaseIndent: PurchaseIndentReducer,
  purchaseOrder: PurchaseOrderReducer,
  grn: GRNReducer,
  purchaseBill: PurchaseBillReducer,
});

export default rootReducer;
