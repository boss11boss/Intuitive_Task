import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
} from "reactstrap";
import { Edit, Trash, Plus } from "react-feather";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import {
  getPurchaseBill,
  deletePurchaseBill,
} from "../../../../redux/actions/Purchase/PurchaseBill";

class PurchaseBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseBillList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPurchaseBill(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.purchaseBill.error &&
      nextProps.purchaseBill.error !== state.error
    ) {
      toast.error(nextProps.purchaseBill.error);
      return {
        error: nextProps.purchaseBill.error,
      };
    }
    if (nextProps.purchaseBill && nextProps.purchaseBill.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.purchaseBill.data).every(
          (p) => nextProps.purchaseBill.data[p] !== state.purchaseBillList[p]
        )
      ) {
        if (
          nextProps.purchaseBill.random !== state.random &&
          nextProps.purchaseBill.successMsg
        ) {
          successMsg = nextProps.purchaseBill.successMsg;
          toast.success(successMsg);
        }
        return {
          purchaseBillList:
            nextProps.purchaseBill.data && nextProps.purchaseBill.data.length
              ? nextProps.purchaseBill.data
              : [],
          successMsg: successMsg,
          random: nextProps.purchaseBill.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  deleteRow = (row) => {
    this.setState({ deleteItem: row });
    this.setState({ deleteAlert: true });
  };
  deleteItem = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteItem.IDNumber,
      IndentNo: this.state.deleteItem.IndentNo,
    };
    this.props.deletePurchaseBill(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getVehicle(postData);
  };

  render() {
    const columns = [
      {
        name: "Actions",
        selector: "actions",
        width: "7%",
        cell: (rowData) =>
          rowData && (
            <>
              <Edit
                className="cursor-pointer mr-1 text-warning"
                size={20}
                onClick={() =>
                  history.push({
                    pathname: `/PurchaseBill/edit/${rowData.IDNumber}`,
                    state: {
                      id: rowData.IDNumber,
                    },
                  })
                }
              />
              <Trash
                className="cursor-pointer text-danger"
                size={20}
                onClick={() => {
                  this.deleteRow(rowData);
                }}
              />
            </>
          ),
      },
      {
        name: "PR No",
        selector: "PRNo",
        sortable: true,
        width: "11%",
      },
      {
        name: "PO IDNumber",
        selector: "POIDNumber",
        sortable: true,
      },
      {
        name: "PO Date",
        selector: "PODate",
        sortable: true,
        cell: (rowData) => moment(rowData.PODate).format("DD-MM-YYYY"),
      },
      {
        name: "Supplier IDNumber",
        selector: "SupplierIDNumber",
        sortable: true,
      },

      {
        name: "Rate Approved",
        selector: "RateApproved",
        sortable: true,
        cell: (rowData) => (rowData.RateApproved ? "Yes" : "No"),
      },
      {
        name: "Payment Approved",
        selector: "PaymentApproved",
        sortable: true,
        cell: (rowData) => (rowData.PaymentApproved ? "Yes" : "No"),
      },
      {
        name: "Quality Approved",
        selector: "QualityApproved",
        sortable: true,
        cell: (rowData) => (rowData.QualityApproved ? "Yes" : "No"),
      },
    ];

    const ExpandableTable = ({ data }) => {
      let PODetails = data?.PODetails;
      return (
        <Card className="cardInside">
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>ItemIDNumber</th>
                  <th>Quantity</th>
                  <th>UnitIDNumber</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {PODetails?.length > 0 &&
                  PODetails.map((d, i) => (
                    <tr key={"PODetailsRows" + i}>
                      <td>{d.ItemIDNumber}</td>
                      <td>{d.Quantity}</td>
                      <td>{d.UnitIDNumber}</td>
                      <td>{d.Rate}</td>
                      <td>{d.Amount}</td>
                      <td>{d.Remarks}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    };

    const { purchaseBillList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Bill</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            <Button
              className="ml-1"
              size="sm"
              color="primary"
              onClick={() => history.push("/PurchaseBill/new")}
            >
              <Plus size={20} className="text-white" />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <DataTable
            data={purchaseBillList}
            columns={columns}
            noHeader
            pagination
            paginationComponentOptions={{
              rowsPerPageText: "Records per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: "All",
            }}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableTable />}
          />
          <ToastContainer />
          <SweetAlert
            title="Delete Item"
            show={this.state.deleteAlert}
            showCancel
            reverseButtons
            onConfirm={() => this.deleteItem()}
            onCancel={() => this.handleAlert("deleteAlert", false)}
          >
            <p className="sweet-alert-text">
              Are you sure you want to delete this Item
            </p>
          </SweetAlert>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchaseBill: state.purchaseBill,
  };
};

export default connect(mapStateToProps, {
  getPurchaseBill,
  deletePurchaseBill,
})(PurchaseBill);
