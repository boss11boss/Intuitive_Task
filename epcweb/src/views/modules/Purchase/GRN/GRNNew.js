import React from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "../../style.css";
import { getPurchaseIndentById } from "../../../../redux/actions/Purchase/PurchaseIndent";
import {
  getGRN,
  getGRNDropDown,
  addGRN,
} from "../../../../redux/actions/Purchase/GRN";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Row,
  CardHeader,
  CardTitle,
  CustomInput,
  Button,
  Input,
  Label,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Eye, Plus, Trash } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "flatpickr/dist/themes/material_green.css";
import { history } from "../../../../history";
import ErrorText from "../../../../views/ui-elements/text-utilities/ErrorText";

import { data } from "jquery";

class GRNNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      projectList: [],
      supplierList: [],
      locationList: [],
      itemList: [],
      unitList: [],
      purchaseOrderList: [],
      inwList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getGRN(postData);
    this.props.getGRNDropDown(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.grn.error !== this.props.grn.error && this.props.grn.error) {
      toast.error(this.props.grn.error);
    }
    if (
      prevProps.grn.successMsg !== this.props.grn.successMsg &&
      this.props.grn.successMsg
    ) {
      toast.success(this.props.grn.successMsg);
    }
    if (prevProps.grn.data !== this.props.grn.data) {
      this.setState({
        response:
          this.props.grn.data && this.props.grn.data.length
            ? this.props.grn.data
            : [],
        random: this.props.grn.random,
      });
    }
    if (prevProps.grn.projectList !== this.props.grn.projectList) {
      let projectData = [];
      this.props.grn.projectList.forEach((item) => {
        projectData.push({ value: item.IDNumber, label: item.ProjectName });
      });

      this.setState({
        projectList:
          this.props.grn.projectList && this.props.grn.projectList.length
            ? projectData
            : [],
      });
    }
    if (prevProps.grn.supplierList !== this.props.grn.supplierList) {
      let supplierData = [];
      this.props.grn.supplierList.forEach((item) => {
        supplierData.push({ value: item.IDNumber, label: item.SupplierName });
      });

      this.setState({
        supplierList:
          this.props.grn.supplierList && this.props.grn.supplierList.length
            ? supplierData
            : [],
      });
    }
    if (prevProps.grn.itemList !== this.props.grn.itemList) {
      let itemData = [];
      this.props.grn.itemList.forEach((item) => {
        itemData.push({ value: item.ItemID, label: item.ItemName });
      });

      this.setState({
        itemList:
          this.props.grn.itemList && this.props.grn.itemList.length
            ? itemData
            : [],
      });
    }
    if (prevProps.grn.unitList !== this.props.grn.unitList) {
      let unitData = [];
      this.props.grn.unitList.forEach((item) => {
        unitData.push({ value: item.IDNumber, label: item.UnitName });
      });

      this.setState({
        unitList:
          this.props.grn.unitList && this.props.grn.unitList.length
            ? unitData
            : [],
      });
    }
    if (prevProps.grn.purchaseOrderList !== this.props.grn.purchaseOrderList) {
      let purchaseOrderData = [];
      this.props.grn.purchaseOrderList.forEach((item) => {
        purchaseOrderData.push({ value: item.IDNumber, label: item.Name });
      });

      this.setState({
        purchaseOrderList:
          this.props.grn.purchaseOrderList &&
          this.props.grn.purchaseOrderList.length
            ? purchaseOrderData
            : [],
      });
    }
    if (prevProps.grn.inwList !== this.props.grn.inwList) {
      this.setState({
        inwList:
          this.props.grn.inwList && this.props.grn.inwList.length
            ? this.props.grn.inwList
            : [],
      });
    }

    if (
      prevProps.grn.data !== this.props.grn.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.grn.data &&
        this.props.grn.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        IndentID: filterData?.IndentID,
        SupplierID: filterData?.SupplierID,
        ProjectID: filterData?.ProjectID,
        PODate: filterData?.PODate,
        DeliveyDate: filterData?.DeliveyDate,
        IndentTime: filterData?.IndentTime,
        PODetails: filterData?.PODetails,
        SpecialInstruction: filterData?.SpecialInstruction,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  toggleModal = (data) => {
    // this.setState({
    //   TaxModal: !this.state.TaxModal,
    //   selectedItemForTax: data,
    // });
    // return <AddTaxPerItem POExcises={this.state.POExcises} />;
  };

  onInputIndentItemDetailsChange = (value, name, id) => {
    const exist = this.state.IndentItemDetails?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.IndentItemDetails?.filter((data) => {
      return data.IDNumber !== id;
    });

    exist[name] = value;
    if (name === "DISCAMT") {
      exist["DISCPERC"] = exist?.DISCAMT
        ? Math.ceil(
            (100 * exist?.DISCAMT) / (exist?.Rate * exist?.Rec_Quantity)
          )
        : 0;
    } else if ((name = "DISCPERC")) {
      exist["DISCAMT"] = exist?.DISCPERC
        ? (exist?.Rate * exist?.Rec_Quantity * exist?.DISCPERC) / 100
        : 0;
    }

    if (exist.Rec_Quantity && exist.Rate) {
      exist["Amount"] = exist.Rec_Quantity * exist.Rate;
    }
    if (exist.Rec_Quantity && exist.Rate && exist.DISCAMT) {
      exist["Amount"] = exist.Rec_Quantity * exist.Rate - exist.DISCAMT;
    }
    if (exist.Rec_Quantity && exist.Rate && exist.DISCPERC) {
      exist["Amount"] =
        exist.Rec_Quantity * exist.Rate -
        (exist.Rec_Quantity * exist.Rate * exist.DISCPERC) / 100;
    }

    this.setState({
      IndentItemDetails: [
        {
          ...exist,
          [name]: value,
        },
        ...unique,
      ],
    });
  };

  onInputChange = (value, name, id) => {
    const exist = this.state.IndentItemDetails?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.IndentItemDetails?.filter((data) => {
      return data.IDNumber !== id;
    });
    console.log("exist", exist);
    exist[name] = value;
    if (name === "DISCAMT") {
      exist["DISCPERC"] = exist?.DISCAMT
        ? Math.ceil(
            (100 * exist?.DISCAMT) / (exist?.Rate * exist?.Rec_Quantity)
          )
        : 0;
    } else if ((name = "DISCPERC")) {
      exist["DISCAMT"] = exist?.DISCPERC
        ? (exist?.Rate * exist?.Rec_Quantity * exist?.DISCPERC) / 100
        : 0;
    }

    if (exist.Rec_Quantity && exist.Rate) {
      exist["Amount"] = exist.Rec_Quantity * exist.Rate;
    }
    if (exist.Rec_Quantity && exist.Rate && exist.DISCAMT) {
      exist["Amount"] = exist.Rec_Quantity * exist.Rate - exist.DISCAMT;
    }
    if (exist.Rec_Quantity && exist.Rate && exist.DISCPERC) {
      exist["Amount"] =
        exist.Rec_Quantity * exist.Rate -
        (exist.Rec_Quantity * exist.Rate * exist.DISCPERC) / 100;
    }

    this.setState({
      IndentItemDetails: [
        {
          ...exist,
          [name]: value,
        },
        ...unique,
      ],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      IndentID,
      SupplierID,
      SpecialInstruction,
      PODate,
      DeliveyDate,
      BasedOnID,
      DepartmentID,
      PODetails,
      DeletedINWDetails,
    } = this.state;
    if (
      SupplierID &&
      SpecialInstruction &&
      PODate &&
      DeliveyDate &&
      BasedOnID &&
      DepartmentID &&
      PODetails.length > 0
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        IndentID: IndentID ? IndentID : "",
        SupplierID,
        SpecialInstruction,
        PODate:
          typeof PODate === "object"
            ? moment(PODate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : PODate,
        DeliveyDate:
          typeof DeliveyDate === "object"
            ? moment(DeliveyDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : DeliveyDate,
        BasedOnID,
        PODetails,
        DeletedINWDetails,
        IndPrepBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        Year_ID: parseInt(localStorage.getItem("yearId")),
        Status: 1,
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        CreatedDate: moment(),
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };
      if (history?.location?.state?.id) {
        await this.props.addGRN({
          ...postData,
        });
      } else {
        await this.props.addGRN(postData);
      }
      await this.resetState();
      await history.push("/GRN");
    }
  };

  resetState = () => {
    this.setState({
      SupplierID: 0,
      LocationID: 0,
      PODate: null,
      IndentTime: null,
      ItemIDNumber: null,
      PODetails: [],
    });
  };

  render() {
    console.log("this.state", this.state);
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>GRN</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/GRN")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form>
              <div
                style={{
                  height: "320px",
                  overflowY: "auto",
                }}
                className="pl-2 pr-2"
              >
                <FormGroup row>
                  <Col>
                    <Label>Project</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="ProjectIDSelect"
                      name="ProjectIDSelect"
                      value={this.state?.ProjectID ? this.state?.ProjectID : 0}
                      className={`p-0 pl-1 `}
                      onChange={(e) =>
                        this.setState({ ProjectID: parseInt(e.target.value) })
                      }
                    >
                      <option value="0">Select Project</option>
                      {this.state.projectList &&
                        this.state.projectList?.length > 0 &&
                        this.state.projectList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.ProjectID && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Supplier</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="SupplierIDSelect"
                      name="SupplierIDSelect"
                      value={
                        this.state?.SupplierID ? this.state?.SupplierID : 0
                      }
                      className={`p-0 pl-1 ${
                        btnFlg && !this.state?.SupplierID ? "invalid-input" : ""
                      }`}
                      onChange={(e) => {
                        this.setState({
                          SupplierID: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Supplier</option>
                      {this.state.supplierList &&
                        this.state.supplierList?.length > 0 &&
                        this.state.supplierList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.SupplierID && <ErrorText />}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <Label>Bill No</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.BillNo ? this.state.BillNo : ""}
                      onChange={(e) => this.onChange(e, "BillNo")}
                      name="BillNo"
                      placeholder="BillNo"
                    />
                  </Col>
                  <Col>
                    <Label>Bill Date</Label>
                    <Flatpickr
                      value={this.state.BillDate}
                      onChange={(date) => {
                        this.setState({ BillDate: date });
                      }}
                      placeholder="Bill Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.BillDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.PODate?.[0] && <ErrorText />}
                  </Col>
                  <Col>
                    <Label>Challan No</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.ChallanNo ? this.state.ChallanNo : ""}
                      onChange={(e) => this.onChange(e, "ChallanNo")}
                      name="ChallanNo"
                      placeholder="ChallanNo"
                    />
                  </Col>
                  <Col>
                    <Label>Challan Date</Label>
                    <Flatpickr
                      value={this.state.ChallanDate}
                      onChange={(date) => {
                        this.setState({ ChallanDate: date });
                      }}
                      placeholder="Challan Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.ChallanDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.ChallanDate?.[0] && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Spec Instruction</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={
                        this.state.SpecialInstruction
                          ? this.state.SpecialInstruction
                          : ""
                      }
                      onChange={(e) => this.onChange(e, "SpecialInstruction")}
                      name="SpecialInstruction"
                      placeholder="SpecialInstruction"
                    />
                  </Col>
                </FormGroup>

                {/* itemdetail ::start */}
                <FormGroup row id="itemdetail">
                  <Col sm="12">
                    <CardTitle>INW Details</CardTitle>
                  </Col>

                  <Col sm="12" className="text-center">
                    {btnFlg && !this.state?.PODetails.length && (
                      <ErrorText text="There must be at least one item detail" />
                    )}
                  </Col>

                  <div className="d-flex w-100">
                    <Col sm="1">
                      <Label></Label>
                    </Col>
                    <Col sm="2">
                      <Label>Location</Label>
                    </Col>
                    <Col sm="2">
                      <Label>Item</Label>
                    </Col>
                    <Col sm="1">
                      <Label>ReceivedQty</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Unit</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Rate</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Remarks</Label>
                    </Col>
                  </div>

                  {this.state.inwList?.length > 0 &&
                    this.state.inwList.map((data, i) => (
                      <div className="d-flex w-100 mt-1" key={"inwList" + i}>
                        <Col sm="1" className=" text-center">
                          <Button
                            color="primary"
                            className="cursor-pointer action-btn mr-1"
                            size="sm"
                            onClick={() => this.toggleModal(data)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            color="danger"
                            className="cursor-pointer action-btn"
                            size="sm"
                            onClick={() => {
                              let objectIndex = this.state.PODetails.findIndex(
                                (d) => d.IDNumber === data.IDNumber
                              );
                              this.state.PODetails.splice(objectIndex, 1);
                              this.setState({
                                DeletedINWDetails:
                                  this.state.DeletedINWDetails +
                                  "," +
                                  data.IDNumber,
                              });
                            }}
                          >
                            <Trash size={16} />
                          </Button>
                        </Col>
                        <Col sm="2">
                          <CustomInput
                            bsSize="sm"
                            type="select"
                            id={"LocationIDSelect" + i}
                            name={"LocationIDSelect" + i}
                            value={data?.LocationID ? data?.LocationID : 0}
                            className={"p-0 pl-1"}
                            onChange={(e) => {
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "LocationID",
                                data?.IDNumber
                              );
                            }}
                          >
                            <option value="0">Select Location</option>
                            {this.state.locationList &&
                              this.state.locationList?.length > 0 &&
                              this.state.locationList.map((d, i) => (
                                <option value={d.value} key={d.value}>
                                  {d.label}
                                </option>
                              ))}
                          </CustomInput>
                        </Col>
                        <Col sm="2">
                          <CustomInput
                            bsSize="sm"
                            type="select"
                            id={"ItemIDNumberSelect" + i}
                            name={"ItemIDNumberSelect" + i}
                            value={data?.ItemID ? data?.ItemID : 0}
                            className={"p-0 pl-1"}
                            onChange={(e) => {
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "ItemIDNumber",
                                data?.IDNumber
                              );
                            }}
                          >
                            <option value="0">Select Item</option>
                            {this.state.itemList &&
                              this.state.itemList?.length > 0 &&
                              this.state.itemList.map((d, i) => (
                                <option value={d.value} key={d.value}>
                                  {d.label}
                                </option>
                              ))}
                          </CustomInput>
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.ReceivedQty ? data?.ReceivedQty : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "ReceivedQty",
                                data?.IDNumber
                              )
                            }
                            name={"quantity" + i}
                            placeholder="ReceivedQty"
                          />
                        </Col>

                        <Col sm="1">
                          <CustomInput
                            bsSize="sm"
                            type="select"
                            id={"UnitIDNumber" + i}
                            value={data?.UnitIDNumber ? data?.UnitIDNumber : ""}
                            className={`p-0 pl-1`}
                            onChange={(e) => {
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "UnitIDNumber",
                                data?.IDNumber
                              );
                            }}
                          >
                            <option value="0">Unit</option>
                            {this.state.unitList &&
                              this.state.unitList?.length > 0 &&
                              this.state.unitList.map((d, i) => (
                                <option value={d.value} key={d.value}>
                                  {d.label}
                                </option>
                              ))}
                          </CustomInput>
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.Rate ? data?.Rate : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "Rate",
                                data?.IDNumber
                              )
                            }
                            name={"Rate"}
                            placeholder="Rate"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="text"
                            value={data?.Remarks ? data?.Remarks : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                e.target.value,
                                "Remarks",
                                data?.IDNumber
                              )
                            }
                            name="Remarks"
                            placeholder="Remarks"
                          />
                        </Col>
                      </div>
                    ))}

                  <div className="d-flex w-100 mt-1">
                    <Col sm="1" className="text-center">
                      <Button
                        size="sm"
                        color="primary"
                        className="cursor-pointer action-btn mr-1"
                        onClick={() => this.handleItemOperation()}
                      >
                        <Plus size={14} />
                      </Button>
                    </Col>

                    <Col sm="2">
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id={"LocationIDSelect"}
                        name={"LocationIDSelect"}
                        value={
                          this.state?.LocationID ? this.state?.LocationID : 0
                        }
                        className={"p-0 pl-1"}
                        onChange={(e) => {
                          this.setState({
                            LocationID: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Select Location</option>
                        {this.state.locationList &&
                          this.state.locationList?.length > 0 &&
                          this.state.locationList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>

                    <Col sm="2">
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id={"ItemIDNumberSelect"}
                        name={"ItemIDNumberSelect"}
                        value={
                          this.state?.ItemIDNumber
                            ? this.state?.ItemIDNumber
                            : 0
                        }
                        className={"p-0 pl-1"}
                        onChange={(e) => {
                          this.setState({
                            ItemIDNumber: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Select Item</option>
                        {this.state.itemList &&
                          this.state.itemList?.length > 0 &&
                          this.state.itemList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.Quantity ? this.state?.Quantity : ""}
                        onChange={(e) => this.onChange(e, "Quantity")}
                        name={"quantity"}
                        placeholder="Quantity"
                      />
                    </Col>

                    <Col sm="1">
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="defaultUnit"
                        value={
                          this.state?.UnitIDNumber
                            ? this.state?.UnitIDNumber
                            : ""
                        }
                        className={`p-0 pl-1`}
                        onChange={(e) => {
                          this.setState({
                            UnitIDNumber: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Unit</option>
                        {this.state.unitList &&
                          this.state.unitList?.length > 0 &&
                          this.state.unitList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.Rate ? this.state?.Rate : ""}
                        onChange={(e) =>
                          this.setState({
                            Rate: parseInt(e.target.value),
                          })
                        }
                        name={"Rate"}
                        placeholder="Rate"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state?.Remarks ? this.state?.Remarks : ""}
                        onChange={(e) =>
                          this.setState({
                            Remarks: e.target.value,
                          })
                        }
                        name="Remarks"
                        placeholder="Remarks"
                      />
                    </Col>
                  </div>
                  {/* </Col> */}
                </FormGroup>

                {/* itemdetail ::end */}
              </div>

              <div row="true" className="mt-1 mb-1">
                <Button.Ripple
                  size="sm"
                  color="primary"
                  className="mr-1 ml-2"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button.Ripple>

                <Button.Ripple
                  size="sm"
                  outline
                  color="warning"
                  type="reset"
                  onClick={this.resetState}
                >
                  Reset
                </Button.Ripple>
              </div>
            </Form>
            <ToastContainer />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grn: state.grn,
  };
};

export default connect(mapStateToProps, {
  getGRN,
  getGRNDropDown,
  addGRN,
})(GRNNew);
