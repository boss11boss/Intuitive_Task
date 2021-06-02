import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getAutoPayslip,
  addAutoPayslip,
  getAutoPayslipDropDown,
} from "../../../../redux/actions/HR/AutoPayslip";

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

class AutoPayslipNew extends React.Component {
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
    this.props.getAutoPayslipDropDown(postData);
    this.props.getAutoPayslip(postData);
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
        await this.props.addAutoPayslip({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addAutoPayslip(postData);
      }
      await this.resetState();
      await history.push("/HR/AutoPayslip");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, PaymentTypeList, EmployeeList, MonthList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Auto Payslip </CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/AutoPayslip")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col sm="8">
                  <Label>Select Month</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="MonthIDSelect"
                    name="MonthIDSelect"
                    value={this.state?.MonthID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.MonthID === 0 ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        MonthID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Month</option>
                    {MonthList &&
                      MonthList?.length > 0 &&
                      MonthList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.MonthName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.MonthID && <ErrorText />}
                </Col>

                <Col sm="4">
                  <Button
                    color="primary"
                    className="cursor-pointer action-btn mr-1 mt-2"
                    size="sm"
                    onClick={() => this.handleAddAccount()}
                    style={{ height: "28px" }}
                  >
                    General Payslip
                  </Button>
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
  getAutoPayslip,
  getAutoPayslipDropDown,
  addAutoPayslip,
})(AutoPayslipNew);
