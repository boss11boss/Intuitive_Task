import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getSalaryInformation,
  addSalaryInformation,
  getSalaryInformationDropDown,
} from "../../../../redux/actions/HR/SalaryInformation";

import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Button,
  Input,
  Label,
  CardHeader,
  CardTitle,
  CustomInput,
  Table,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { Eye } from "react-feather";

class SalaryInformationNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      SupplierList: [],
      VehicleList: [],
      UnitList: [],
      IsBillable: false,
      Days: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getSalaryInformationDropDown(postData);
    this.props.getSalaryInformation(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.earningMaster.error !== this.props.earningMaster.error &&
      this.props.earningMaster.error
    ) {
      toast.error(this.props.earningMaster.error);
    }
    if (
      prevProps.earningMaster.successMsg !==
        this.props.earningMaster.successMsg &&
      this.props.earningMaster.successMsg
    ) {
      toast.success(this.props.earningMaster.successMsg);
    }

    if (
      prevProps.earningMaster.AccountGroupList !==
      this.props.earningMaster.AccountGroupList
    ) {
      this.setState({
        AccountGroupList:
          this.props.earningMaster.AccountGroupList &&
          this.props.earningMaster.AccountGroupList.length
            ? this.props.earningMaster.AccountGroupList
            : [],
      });
    }

    if (
      prevProps.earningMaster.VehicleList !==
      this.props.earningMaster.VehicleList
    ) {
      this.setState({
        VehicleList:
          this.props.earningMaster.VehicleList &&
          this.props.earningMaster.VehicleList.length
            ? this.props.earningMaster.VehicleList
            : [],
      });
    }

    if (
      prevProps.earningMaster.data !== this.props.earningMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.earningMaster.data &&
        this.props.earningMaster.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        AccountGroup: filterData?.AccountGroup,
        AccountName: filterData?.AccountName,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const { AccountGroup, AccountName, itemData } = this.state;

    if (AccountGroup && AccountName) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,

        AccountGroup,
        AccountName,
        Year_ID:
          localStorage.getItem("yearId") && localStorage.getItem("yearId"),
        CreatedDate: history?.location?.state?.id
          ? itemData?.CreatedDate
          : moment(),
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };

      if (history?.location?.state?.id) {
        await this.props.addSalaryInformation({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addSalaryInformation(postData);
      }
      await this.resetState();
      await history.push("/HR/SalaryInformation");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, PaymentTypeList, EmployeeList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Salary Information</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/SalaryInformation")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                  <Label>Date</Label>
                  <Flatpickr
                    value={this.state.Date}
                    onChange={(date) => {
                      this.setState({ Date: date });
                    }}
                    placeholder="Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Date ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Date && <ErrorText />}
                </Col>
                <Col>
                  <Label>Payment Type</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="PaymentTypeIDSelect"
                    name="PaymentTypeIDSelect"
                    value={this.state?.PaymentTypeID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.PaymentTypeID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        PaymentTypeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select PaymentType</option>
                    {PaymentTypeList &&
                      PaymentTypeList?.length > 0 &&
                      PaymentTypeList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.PaymentTypeName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.PaymentTypeID && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Employee</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="EmployeeIDSelect"
                    name="EmployeeIDSelect"
                    value={this.state?.EmployeeID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.EmployeeID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        EmployeeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Employee</option>
                    {EmployeeList &&
                      EmployeeList?.length > 0 &&
                      EmployeeList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.EmployeeName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.EmployeeID && <ErrorText />}
                </Col>
                <Col>
                  <Label>Employee Code</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.EmployeeCode ? this.state.EmployeeCode : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.EmployeeCode ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ EmployeeCode: e.target.value })
                    }
                    name="EmployeeCode"
                    id="EmployeeCode"
                    placeholder="EmployeeCode"
                  />
                  {btnFlg && !this.state?.EmployeeCode && <ErrorText />}
                </Col>
                <Col>
                  <Label>Basic Amount</Label>
                  <Input
                    bsSize="sm"
                    type="number"
                    value={this.state.BasicAmount ? this.state.BasicAmount : ""}
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.BasicAmount ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ BasicAmount: e.target.value })
                    }
                    name="BasicAmount"
                    id="BasicAmount"
                    placeholder="BasicAmount"
                  />
                  {btnFlg && !this.state?.BasicAmount && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Earning Details</Label>
                  <Table>
                    <thead>
                      <tr>
                        <th>Earning</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Salary</td>
                        <td>35000</td>
                      </tr>
                      <tr>
                        <td>xyz</td>
                        <td>XXXX</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <Label>Deduction Details</Label>
                  <Table>
                    <thead>
                      <tr>
                        <th>Deduction</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>PF</td>
                        <td>4003</td>
                      </tr>
                      <tr>
                        <td>xyz</td>
                        <td>XXXX</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Remarks</Label>
                  <Input
                    type="text"
                    value={this.state.Remarks ? this.state.Remarks : ""}
                    onChange={(e) => this.setState({ Remarks: e.target.value })}
                    name="Remarks"
                    id="Remarks"
                    placeholder="Remarks"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Remarks ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Remarks && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm="12">
                  <Button.Ripple
                    size="sm"
                    color="primary"
                    type="submit"
                    className="mr-1 "
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button.Ripple>
                  {!history?.location?.state?.id && (
                    <Button.Ripple
                      size="sm"
                      outline
                      color="warning"
                      type="reset"
                      onClick={this.resetState}
                    >
                      Reset
                    </Button.Ripple>
                  )}
                </Col>
              </FormGroup>
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
    earningMaster: state.earningMaster,
  };
};

export default connect(mapStateToProps, {
  getSalaryInformation,
  getSalaryInformationDropDown,
  addSalaryInformation,
})(SalaryInformationNew);
