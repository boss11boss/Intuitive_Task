import React from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "../../style.css";
import { getPurchaseIndentById } from "../../../../redux/actions/Purchase/PurchaseIndent";
import {
  getPurchaseOrder,
  getPurchaseOrderDropDown,
  addPurchaseOrder,
} from "../../../../redux/actions/Purchase/PurchaseOrder";
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
import { AddTaxPerItem } from "./AddTaxPerItem";
import { data } from "jquery";

class PurchaseOrderNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      projectList: [],
      supplierList: [],
      SpecialInstructionList: [],
      taxList: [],
      itemList: [],
      unitList: [],
      basedOnList: [],
      // ItemIDNumber: 0,
      // Qty: 0,
      // UnitIDNumber: 0,
      PODetails: [],
      IndentItemDetails: [],
      DeletedPODetails: "",
      TaxModal: false,
      selectedPurchaseIndent: {},
      selectedItemForTax: {},
      POExcises: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPurchaseOrder(postData);
    this.props.getPurchaseOrderDropDown(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.purchaseIndent &&
      nextProps.purchaseIndent.selectedPurchaseIndent
    ) {
      return {
        selectedPurchaseIndent: nextProps.purchaseIndent.selectedPurchaseIndent
          ? nextProps.purchaseIndent.selectedPurchaseIndent
          : [],
        IndentItemDetails: nextProps.purchaseIndent.selectedPurchaseIndent
          .ItemDetails
          ? nextProps.purchaseIndent.selectedPurchaseIndent.ItemDetails
          : [],
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.purchaseOrder.error !== this.props.purchaseOrder.error &&
      this.props.purchaseOrder.error
    ) {
      toast.error(this.props.purchaseOrder.error);
    }
    if (
      prevProps.purchaseOrder.successMsg !==
        this.props.purchaseOrder.successMsg &&
      this.props.purchaseOrder.successMsg
    ) {
      toast.success(this.props.purchaseOrder.successMsg);
    }
    if (prevProps.purchaseOrder.data !== this.props.purchaseOrder.data) {
      this.setState({
        response:
          this.props.purchaseOrder.data && this.props.purchaseOrder.data.length
            ? this.props.purchaseOrder.data
            : [],
        random: this.props.purchaseOrder.random,
      });
    }
    if (
      prevProps.purchaseOrder.projectList !==
      this.props.purchaseOrder.projectList
    ) {
      let projectData = [];
      this.props.purchaseOrder.projectList.forEach((item) => {
        projectData.push({ value: item.IDNumber, label: item.ProjectName });
      });

      this.setState({
        projectList:
          this.props.purchaseOrder.projectList &&
          this.props.purchaseOrder.projectList.length
            ? projectData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.supplierList !==
      this.props.purchaseOrder.supplierList
    ) {
      let supplierData = [];
      this.props.purchaseOrder.supplierList.forEach((item) => {
        supplierData.push({ value: item.IDNumber, label: item.SupplierName });
      });

      this.setState({
        supplierList:
          this.props.purchaseOrder.supplierList &&
          this.props.purchaseOrder.supplierList.length
            ? supplierData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.basedOnList !==
      this.props.purchaseOrder.basedOnList
    ) {
      let basedOnData = [];
      this.props.purchaseOrder.basedOnList.forEach((item) => {
        basedOnData.push({ value: item.IDNumber, label: item.Name });
      });

      this.setState({
        basedOnList:
          this.props.purchaseOrder.basedOnList &&
          this.props.purchaseOrder.basedOnList.length
            ? basedOnData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.purchaseIndentList !==
      this.props.purchaseOrder.purchaseIndentList
    ) {
      let purchaseIndentData = [];
      this.props.purchaseOrder.purchaseIndentList.forEach((item) => {
        purchaseIndentData.push({
          value: item.IDNumber,
          label: item.IndentNo,
        });
      });

      this.setState({
        purchaseIndentList:
          this.props.purchaseOrder.purchaseIndentList &&
          this.props.purchaseOrder.purchaseIndentList.length
            ? purchaseIndentData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.departmentList !==
      this.props.purchaseOrder.departmentList
    ) {
      let departmentData = [];
      this.props.purchaseOrder.departmentList.forEach((item) => {
        departmentData.push({ value: item.IDNumber, label: item.Department });
      });

      this.setState({
        departmentList:
          this.props.purchaseOrder.departmentList &&
          this.props.purchaseOrder.departmentList.length
            ? departmentData
            : [],
      });
    }
    if (prevProps.purchaseOrder.taxList !== this.props.purchaseOrder.taxList) {
      this.setState({
        taxList:
          this.props.purchaseOrder.taxList &&
          this.props.purchaseOrder.taxList.length
            ? this.props.purchaseOrder.taxList
            : [],
      });
    }

    if (
      prevProps.purchaseOrder.itemList !== this.props.purchaseOrder.itemList
    ) {
      let itemData = [];
      this.props.purchaseOrder.itemList.forEach((item) => {
        itemData.push({ value: item.ItemID, label: item.ItemName });
      });

      this.setState({
        itemList:
          this.props.purchaseOrder.itemList &&
          this.props.purchaseOrder.itemList.length
            ? itemData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.unitList !== this.props.purchaseOrder.unitList
    ) {
      let unitData = [];
      this.props.purchaseOrder.unitList.forEach((item) => {
        unitData.push({ value: item.IDNumber, label: item.UnitName });
      });

      this.setState({
        unitList:
          this.props.purchaseOrder.unitList &&
          this.props.purchaseOrder.unitList.length
            ? unitData
            : [],
      });
    }

    // if (
    //   prevProps.purchaseOrder.PODetails !== this.props.purchaseOrder.PODetails
    // ) {
    //   this.setState({
    //     PODetails: this.props.purchaseOrder.PODetails
    //       ? this.props.purchaseOrder.PODetails
    //       : [],
    //   });
    // }

    if (
      prevProps.purchaseOrder.data !== this.props.purchaseOrder.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.purchaseOrder.data &&
        this.props.purchaseOrder.data.filter((data) => {
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
    return <AddTaxPerItem POExcises={this.state.POExcises} />;
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

  onTaxInputChange = () => [];

  handleTaxOperation = (data) => {
    const exist = this.state.POExcises?.filter((data) => {
      return data.IDNumber === this.state.id;
    })?.[0];
    if (exist) {
      let objectIndex = this.state.POExcises.findIndex(
        (d) => d.IDNumber === this.state.id
      );
      let tmpPOExcises = [...this.state.POExcises];

      tmpPOExcises[objectIndex] = {
        ...tmpPOExcises[objectIndex],
        ItemIDNumber: data.ItemIDNumber,
        TaxID: this.state.TaxID,
        PODetailID: this.state.PODetailID,
        AccountID: this.state.AccountID,
        Percentage: this.state.Percentage,
        Amount: this.state.Amount,
        AmountBase: this.state.AmountBase,
        AmountWithIT: this.state.AmountWithIT,
        ValueType: this.state.ValueType,
        Remarkss: this.state.TaxRemarkss,
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        CreatedDate: moment(),
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };
      this.setState({
        POExcises: tmpPOExcises,
      });
    } else {
      if (this.state.POExcises !== null && this.state.POExcises.length > 0) {
        this.setState({
          POExcises: [
            ...this.state.POExcises,
            {
              IDNumber: 0,
              ItemIDNumber: data.ItemIDNumber,
              TaxID: this.state.TaxID,
              PODetailID: this.state.PODetailID,
              AccountID: this.state.AccountID,
              Percentage: this.state.Percentage,
              Amount: this.state.Amount,
              AmountBase: this.state.AmountBase,
              AmountWithIT: this.state.AmountWithIT,
              ValueType: this.state.ValueType,
              Remarkss: this.state.TaxRemarkss,
              CreatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              CreatedDate: moment(),
              UpdatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              UpdatedDate: moment(),
            },
          ],
        });
      } else {
        this.setState({
          POExcises: [
            {
              IDNumber: 0,
              ItemIDNumber: data.ItemIDNumber,
              TaxID: this.state.TaxID,
              PODetailID: this.state.PODetailID,
              AccountID: this.state.AccountID,
              Percentage: this.state.Percentage,
              Amount: this.state.Amount,
              AmountBase: this.state.AmountBase,
              AmountWithIT: this.state.AmountWithIT,
              ValueType: this.state.ValueType,
              Remarkss: this.state.TaxRemarkss,
              CreatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              CreatedDate: moment(),
              UpdatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              UpdatedDate: moment(),
            },
          ],
        });
      }
    }

    // this.toggleItemModal();
    this.setState({
      item: {},
      IsAlliasForPrinting: false,
      AlliasForItem: "",
      AlliasForItemCode: "",
      Remarkss: "",
      Rate: "",
      unit: {},
      IsQCPassReq: false,
      ISBillable: false,
    });
  };

  handleItemOperation = () => {
    const exist = this.state.PODetails?.filter((data) => {
      return data.IDNumber === this.state.id;
    })?.[0];
    if (exist) {
      let objectIndex = this.state.PODetails.findIndex(
        (d) => d.IDNumber === this.state.id
      );
      let tmpPODetails = [...this.state.PODetails];

      tmpPODetails[objectIndex] = {
        ...tmpPODetails[objectIndex],
        ItemIDNumber: this.state.ItemIDNumber,
        Quantity: this.state.Quantity,
        UnitIDNumber: this.state.UnitIDNumber,
        Rate: this.state.Rate,
        Rec_Quantity: this.state.Rec_Quantity,
        InwardQty: this.state.InwardQty,
        BaseAmount: this.state.BaseAmount,
        TotalIndentQty: this.state.TotalIndentQty,
        QtyPerUnit: this.state.QtyPerUnit,
        RatePerUnit: this.state.RatePerUnit,
        BaseQty: this.state.BaseQty,
        DISCPERC: this.state.DISCPERC,
        DISCAMT: this.state.DISCAMT,
        Remarks: this.state.Remarks,
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        CreatedDate: moment(),
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };
      this.setState({
        PODetails: tmpPODetails,
      });
    } else {
      if (this.state.PODetails !== null && this.state.PODetails.length > 0) {
        this.setState({
          PODetails: [
            ...this.state.PODetails,
            {
              IDNumber: 0,
              ItemIDNumber: data.ItemIDNumber,
              TaxID: this.state.TaxID,
              PODetailID: this.state.PODetailID,
              AccountID: this.state.AccountID,
              Percentage: this.state.Percentage,
              Amount: this.state.Amount,
              AmountBase: this.state.AmountBase,
              AmountWithIT: this.state.AmountWithIT,
              ValueType: this.state.ValueType,
              Remarkss: this.state.TaxRemarkss,
              CreatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              CreatedDate: moment(),
              UpdatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              UpdatedDate: moment(),
            },
          ],
        });
      } else {
        this.setState({
          PODetails: [
            {
              IDNumber: 0,
              ItemIDNumber: data.ItemIDNumber,
              TaxID: this.state.TaxID,
              PODetailID: this.state.PODetailID,
              AccountID: this.state.AccountID,
              Percentage: this.state.Percentage,
              Amount: this.state.Amount,
              AmountBase: this.state.AmountBase,
              AmountWithIT: this.state.AmountWithIT,
              ValueType: this.state.ValueType,
              Remarkss: this.state.TaxRemarkss,
              CreatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              CreatedDate: moment(),
              UpdatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              UpdatedDate: moment(),
            },
          ],
        });
      }
    }
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
      DeletedPODetails,
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
        DeletedPODetails,
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
        await this.props.addPurchaseOrder({
          ...postData,
        });
      } else {
        await this.props.addPurchaseOrder(postData);
      }
      await this.resetState();
      await history.push("/PurchaseOrder");
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
    const {
      TaxModal,
      btnFlg,
      selectedPurchaseIndent,
      PODetails,
      selectedItemForTax,
      taxList,
      POExcises,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Purchase Order</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/PurchaseOrder")}
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
                    <Label>Base On</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="BasedOnIDSelect"
                      name="BasedOnIDSelect"
                      value={this.state?.BasedOnID}
                      className={`p-0 pl-1 ${
                        btnFlg && !this.state?.BasedOnID ? "invalid-input" : ""
                      }`}
                      onChange={(e) => {
                        this.setState({
                          BasedOnID: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Base On</option>
                      {this.state.basedOnList &&
                        this.state.basedOnList?.length > 0 &&
                        this.state.basedOnList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.BasedOnID && <ErrorText />}
                  </Col>

                  {this.state.BasedOnID === 1 ? (
                    <Col>
                      <Label>Purchase Indent</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="IndentIDSelect"
                        name="IndentIDSelect"
                        value={this.state?.IndentID}
                        className={`p-0 pl-1 ${
                          btnFlg && !this.state?.IndentID ? "invalid-input" : ""
                        }`}
                        onChange={(e) => {
                          this.props.getPurchaseIndentById({
                            IDNumber: parseInt(e.target.value),
                          });
                          this.setState({
                            IndentID: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Select Purchase Indent</option>
                        {this.state.purchaseIndentList &&
                          this.state.purchaseIndentList?.length > 0 &&
                          this.state.purchaseIndentList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>
                  ) : (
                    ""
                  )}

                  <Col>
                    <Label>Project</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="ProjectIDSelect"
                      name="ProjectIDSelect"
                      value={
                        selectedPurchaseIndent?.ProjectID
                          ? selectedPurchaseIndent?.ProjectID
                          : this.state?.ProjectID
                          ? this.state?.ProjectID
                          : 0
                      }
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
                    <Label>PO Date</Label>
                    <Flatpickr
                      value={this.state.PODate}
                      onChange={(date) => {
                        this.setState({ PODate: date });
                      }}
                      placeholder="PO Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.PODate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.PODate?.[0] && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Delivery Date</Label>
                    <Flatpickr
                      value={this.state.DeliveyDate}
                      onChange={(date) => {
                        this.setState({ DeliveyDate: date });
                      }}
                      placeholder="Delivery Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.DeliveyDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.DeliveyDate?.[0] && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Department</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="DepartmentIDSelect"
                      name="DepartmentIDSelect"
                      value={this.state?.DepartmentID}
                      className={`p-0 pl-1 ${
                        btnFlg && !this.state?.DepartmentID
                          ? "invalid-input"
                          : ""
                      }`}
                      onChange={(e) => {
                        this.setState({
                          DepartmentID: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Department</option>
                      {this.state.departmentList &&
                        this.state.departmentList?.length > 0 &&
                        this.state.departmentList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.DepartmentID && <ErrorText />}
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
                    <CardTitle>Item Details</CardTitle>
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
                      <Label>Item</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Quantity</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Unit</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Rate</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Rec_Quantity</Label>
                    </Col>
                    <Col sm="1">
                      <Label>InwardQty</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Base Rate</Label>
                    </Col>
                    <Col sm="2">
                      <Label>Conversation Rate</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Base Amount</Label>
                    </Col>
                    <Col sm="1">
                      <Label>TotalIndentQty</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Qty Per Unit </Label>
                    </Col>
                    <Col sm="1">
                      <Label>Rate per unit</Label>
                    </Col>
                    <Col sm="1">
                      <Label>BaseQty</Label>
                    </Col>
                    <Col sm="1">
                      <Label>DISCPERC</Label>
                    </Col>
                    <Col sm="1">
                      <Label>DISCAMT</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Amount</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Remarks</Label>
                    </Col>
                  </div>

                  {this.state.IndentItemDetails?.length > 0 &&
                    this.state.IndentItemDetails.map((data, i) => (
                      <div
                        className="d-flex w-100 mt-1"
                        key={"IndentItemDetails" + i}
                      >
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
                                DeletedPODetails:
                                  this.state.DeletedPODetails +
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
                            id={"ItemIDNumberSelect"}
                            name={"ItemIDNumberSelect"}
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
                            value={data?.Quantity ? data?.Quantity : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "Quantity",
                                data?.IDNumber
                              )
                            }
                            name={"quantity"}
                            placeholder="Quantity"
                          />
                        </Col>

                        <Col sm="1">
                          <CustomInput
                            bsSize="sm"
                            type="select"
                            id="defaultUnit"
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
                            type="number"
                            value={data?.Rec_Quantity ? data?.Rec_Quantity : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "Rec_Quantity",
                                data?.IDNumber
                              )
                            }
                            name={"Rec_Quantity"}
                            placeholder="Rec_Quantity"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.InwardQty ? data?.InwardQty : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "InwardQty",
                                data?.IDNumber
                              )
                            }
                            name={"InwardQty"}
                            placeholder="InwardQty"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.BaseRate ? data?.BaseRate : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "BaseRate",
                                data?.IDNumber
                              )
                            }
                            name={"BaseRate"}
                            placeholder="BaseRate"
                          />
                        </Col>

                        <Col sm="2">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={
                              data?.ConversionRate ? data?.ConversionRate : ""
                            }
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "ConversionRate",
                                data?.IDNumber
                              )
                            }
                            name={"ConversionRate" + i}
                            placeholder="ConversionRate"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.BaseAmount ? data?.BaseAmount : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "BaseAmount",
                                data?.IDNumber
                              )
                            }
                            name={"BaseAmount"}
                            placeholder="BaseAmount"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={
                              data?.TotalIndentQty ? data?.TotalIndentQty : ""
                            }
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "TotalIndentQty",
                                data?.IDNumber
                              )
                            }
                            name={"TotalIndentQty"}
                            placeholder="TotalIndentQty"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.QtyPerUnit ? data?.QtyPerUnit : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "QtyPerUnit",
                                data?.IDNumber
                              )
                            }
                            name={"QtyPerUnit"}
                            placeholder="QtyPerUnit"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.RatePerUnit ? data?.RatePerUnit : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "RatePerUnit",
                                data?.IDNumber
                              )
                            }
                            name={"RatePerUnit"}
                            placeholder="RatePerUnit"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.BaseQty ? data?.BaseQty : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "BaseQty",
                                data?.IDNumber
                              )
                            }
                            name={"BaseQty"}
                            placeholder="BaseQty"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.DISCPERC ? data?.DISCPERC : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "DISCPERC",
                                data?.IDNumber
                              )
                            }
                            name="DISCPERC"
                            placeholder="Discount(%)"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.DISCAMT ? data?.DISCAMT : ""}
                            onChange={(e) =>
                              this.onInputIndentItemDetailsChange(
                                parseInt(e.target.value),
                                "DISCAMT",
                                data?.IDNumber
                              )
                            }
                            name="DISCAMT"
                            placeholder="Discount in Amount"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="number"
                            value={data?.Amount ? data?.Amount : ""}
                            name={"Amount"}
                            placeholder="Amount"
                            disabled
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

                  {this.state.PODetails?.length > 0 &&
                    this.state.PODetails?.map((data, i) => {
                      return (
                        <>
                          <div
                            className="d-flex w-100 mt-1"
                            key={"PODetails" + i}
                          >
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
                                    DeletedPODetails:
                                      this.state.DeletedPODetails +
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
                                id={"ItemIDNumberSelect" + i}
                                name={"ItemIDNumberSelect" + i}
                                value={
                                  data?.ItemIDNumber ? data?.ItemIDNumber : 0
                                }
                                className={"p-0 pl-1"}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "ItemIDNumber",
                                    data?.IDNumber
                                  )
                                }
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
                                value={data?.Quantity ? data?.Quantity : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "Quantity",
                                    data?.IDNumber
                                  )
                                }
                                name={"quantity" + i}
                                placeholder="Quantity"
                              />
                            </Col>

                            <Col sm="1">
                              <CustomInput
                                bsSize="sm"
                                type="select"
                                id={"UnitIDNumberSelect" + i}
                                name={"UnitIDNumberSelect" + i}
                                value={
                                  data?.UnitIDNumber ? data?.UnitIDNumber : ""
                                }
                                className={`p-0 pl-1`}
                                onChange={(e) => {
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "UnitIDNumber",
                                    data?.IDNumber
                                  );
                                }}
                              >
                                <option value="0">Select Unit</option>
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
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "Rate",
                                    data?.IDNumber
                                  )
                                }
                                name={"Rate" + i}
                                placeholder="Rate"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={
                                  data?.Rec_Quantity ? data?.Rec_Quantity : ""
                                }
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "Rec_Quantity",
                                    data?.IDNumber
                                  )
                                }
                                name={"Rec_Quantity" + i}
                                placeholder="Rec_Quantity"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.InwardQty ? data?.InwardQty : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "InwardQty",
                                    data?.IDNumber
                                  )
                                }
                                name={"InwardQty" + i}
                                placeholder="InwardQty"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.BaseRate ? data?.BaseRate : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "BaseRate",
                                    data?.IDNumber
                                  )
                                }
                                name={"BaseRate" + i}
                                placeholder="BaseRate"
                              />
                            </Col>

                            <Col sm="2">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={
                                  data?.ConversionRate
                                    ? data?.ConversionRate
                                    : ""
                                }
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "ConversionRate",
                                    data?.IDNumber
                                  )
                                }
                                name={"ConversionRate" + i}
                                placeholder="ConversionRate"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.BaseAmount ? data?.BaseAmount : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "BaseAmount",
                                    data?.IDNumber
                                  )
                                }
                                name={"BaseAmount" + i}
                                placeholder="BaseAmount"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={
                                  data?.TotalIndentQty
                                    ? data?.TotalIndentQty
                                    : ""
                                }
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "TotalIndentQty",
                                    data?.IDNumber
                                  )
                                }
                                name={"TotalIndentQty" + i}
                                placeholder="TotalIndentQty"
                              />
                            </Col>
                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.QtyPerUnit ? data?.QtyPerUnit : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "QtyPerUnit",
                                    data?.IDNumber
                                  )
                                }
                                name={"QtyPerUnit" + i}
                                placeholder="QtyPerUnit"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={
                                  data?.RatePerUnit ? data?.RatePerUnit : ""
                                }
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "RatePerUnit",
                                    data?.IDNumber
                                  )
                                }
                                name={"RatePerUnit" + i}
                                placeholder="RatePerUnit"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.BaseQty ? data?.BaseQty : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "BaseQty",
                                    data?.IDNumber
                                  )
                                }
                                name={"BaseQty" + i}
                                placeholder="BaseQty"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.DISCPERC}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "DISCPERC",
                                    data?.IDNumber
                                  )
                                }
                                name={"DISCPERC" + i}
                                placeholder="Discount(%)"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.DISCAMT}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "DISCAMT",
                                    data?.IDNumber
                                  )
                                }
                                name={"DISCAMT" + i}
                                placeholder="Discount in Amount"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.Amount ? data?.Amount : ""}
                                onChange={(e) => this.onChange(e, "Amount")}
                                name={"Amount" + i}
                                placeholder="Amount"
                                disabled
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="text"
                                value={data?.Remarks ? data?.Remarks : ""}
                                onChange={(e) =>
                                  this.onInputChange(
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
                        </>
                      );
                    })}

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
                        type="number"
                        value={
                          this.state?.Rec_Quantity
                            ? this.state?.Rec_Quantity
                            : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            Rec_Quantity: parseInt(e.target.value),
                          })
                        }
                        name={"Rec_Quantity"}
                        placeholder="Rec_Quantity"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={
                          this.state?.InwardQty ? this.state?.InwardQty : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            InwardQty: parseInt(e.target.value),
                          })
                        }
                        name={"InwardQty"}
                        placeholder="InwardQty"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.BaseRate ? this.state?.BaseRate : ""}
                        onChange={(e) =>
                          this.setState({
                            BaseRate: parseInt(e.target.value),
                          })
                        }
                        name={"BaseRate"}
                        placeholder="BaseRate"
                      />
                    </Col>

                    <Col sm="2">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={
                          this.state?.ConversionRate
                            ? this.state?.ConversionRate
                            : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            ConversionRate: parseInt(e.target.value),
                          })
                        }
                        name={"ConversionRate"}
                        placeholder="ConversionRate"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={
                          this.state?.BaseAmount ? this.state?.BaseAmount : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            BaseAmount: parseInt(e.target.value),
                          })
                        }
                        name={"BaseAmount"}
                        placeholder="BaseAmount"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={
                          this.state?.TotalIndentQty
                            ? this.state?.TotalIndentQty
                            : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            TotalIndentQty: parseInt(e.target.value),
                          })
                        }
                        name={"TotalIndentQty"}
                        placeholder="TotalIndentQty"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={
                          this.state?.QtyPerUnit ? this.state?.QtyPerUnit : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            QtyPerUnit: parseInt(e.target.value),
                          })
                        }
                        name={"QtyPerUnit"}
                        placeholder="QtyPerUnit"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={
                          this.state?.RatePerUnit ? this.state?.RatePerUnit : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            RatePerUnit: parseInt(e.target.value),
                          })
                        }
                        name={"RatePerUnit"}
                        placeholder="RatePerUnit"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.BaseQty ? this.state?.BaseQty : ""}
                        onChange={(e) =>
                          this.setState({
                            BaseQty: parseInt(e.target.value),
                          })
                        }
                        name={"BaseQty"}
                        placeholder="BaseQty"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.DISCPERC ? this.state?.DISCPERC : ""}
                        onChange={(e) =>
                          this.setState({
                            DISCPERC: parseInt(e.target.value),
                          })
                        }
                        name="DISCPERC"
                        placeholder="Discount(%)"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.DISCAMT ? this.state?.DISCAMT : ""}
                        onChange={(e) =>
                          this.setState({
                            DISCAMT: parseInt(e.target.value),
                          })
                        }
                        name="DISCAMT"
                        placeholder="Discount in Amount"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.Amount ? this.state?.Amount : ""}
                        name={"Amount"}
                        placeholder="Amount"
                        disabled
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
                <FormGroup row className="pl-2 pr-2">
                  <Col>
                    <Label>Item Total</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      name={"Amount"}
                      placeholder="Amount"
                      value={
                        PODetails.length > 0
                          ? PODetails.reduce((d, b) => b.Amount + d.Amount)
                          : 0
                      }
                      disabled
                    />
                  </Col>
                  <Col>
                    <Label>Tax/Duty Total</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      name={"Amount"}
                      placeholder="Amount"
                      disabled
                    />
                  </Col>
                  <Col>
                    <Label>Total Amount</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      name={"Amount"}
                      placeholder="Amount"
                      disabled
                    />
                  </Col>
                </FormGroup>
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
        <AddTaxPerItem
          TaxModal={TaxModal}
          toggle={this.toggleModal}
          data={selectedItemForTax}
          taxList={taxList}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchaseIndent: state.purchaseIndent,
    purchaseOrder: state.purchaseOrder,
  };
};

export default connect(mapStateToProps, {
  getPurchaseIndentById,
  getPurchaseOrder,
  getPurchaseOrderDropDown,
  addPurchaseOrder,
})(PurchaseOrderNew);
