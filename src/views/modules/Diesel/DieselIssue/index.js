import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Edit, Trash, Plus } from "react-feather";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import {
  getDieselIssue,
  deleteDieselIssue,
} from "../../../../redux/actions/Diesel/DieselIssue";
import { hasRight } from "../../../../constant/commonDS";

class DieselIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dieselIssueList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getDieselIssue(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.dieselIssue.error &&
      nextProps.dieselIssue.error !== state.error
    ) {
      toast.error(nextProps.dieselIssue.error);
      return {
        error: nextProps.dieselIssue.error,
      };
    }
    if (nextProps.dieselIssue && nextProps.dieselIssue.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.dieselIssue.data).every(
          (p) => nextProps.dieselIssue.data[p] !== state.dieselIssueList[p]
        )
      ) {
        if (
          nextProps.dieselIssue.random !== state.random &&
          nextProps.dieselIssue.successMsg
        ) {
          successMsg = nextProps.dieselIssue.successMsg;
          toast.success(successMsg);
        }
        return {
          dieselIssueList:
            nextProps.dieselIssue.data && nextProps.dieselIssue.data.length
              ? nextProps.dieselIssue.data
              : [],
          successMsg: successMsg,
          random: nextProps.dieselIssue.random,
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
      ProjectName: this.state.deleteItem.ProjectName,
    };
    this.props.deleteDieselIssue(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getDieselIssue(postData);
  };

  render() {
    let Access = hasRight("ISS_DSL");
    let columns;
    if (Access.AllowUpdate || Access.AllowDelete) {
      columns = [
        {
          name: "Actions",
          selector: "actions",
          width: "7%",
          cell: (rowData) =>
            rowData && (
              <>
                {Access.AllowUpdate ? (
                  <Edit
                    className="cursor-pointer mr-1 text-warning"
                    size={20}
                    onClick={() =>
                      history.push({
                        pathname: `/Diesel/DieselIssue/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      })
                    }
                  />
                ) : (
                  ""
                )}
                {Access.AllowDelete ? (
                  <Trash
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={() => {
                      this.deleteRow(rowData);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            ),
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "11%",
        },
        {
          name: "SupplierName",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Vehicle No",
          selector: "VehicleNo",
          sortable: true,
        },
        {
          name: "Diesel Stock",
          selector: "DieselStock",
          sortable: true,
        },
        {
          name: "OnDate",
          selector: "OnDate",
          sortable: true,
          cell: (rowData) => moment(rowData.OnDate).format("DD-MM-YYYY"),
        },
        {
          name: "Qty",
          selector: "Qty",
          sortable: true,
        },
        {
          name: "IsBillable",
          selector: "IsBillable",
          sortable: true,
          cell: (rowData) => (rowData.IsBillable ? "Yes" : "No"),
        },
        {
          name: "IsFreeIssue",
          selector: "IsFreeIssue",
          sortable: true,
          cell: (rowData) => (rowData.IsFreeIssue ? "Yes" : "No"),
        },
      ];
    } else {
      columns = [
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "11%",
        },
        {
          name: "SupplierName",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Vehicle No",
          selector: "VehicleNo",
          sortable: true,
        },
        {
          name: "Diesel Stock",
          selector: "DieselStock",
          sortable: true,
        },
        {
          name: "OnDate",
          selector: "OnDate",
          sortable: true,
          cell: (rowData) => moment(rowData.OnDate).format("DD-MM-YYYY"),
        },
        {
          name: "Qty",
          selector: "Qty",
          sortable: true,
        },
        {
          name: "IsBillable",
          selector: "IsBillable",
          sortable: true,
          cell: (rowData) => (rowData.IsBillable ? "Yes" : "No"),
        },
        {
          name: "IsFreeIssue",
          selector: "IsFreeIssue",
          sortable: true,
          cell: (rowData) => (rowData.IsFreeIssue ? "Yes" : "No"),
        },
      ];
    }

    const { dieselIssueList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Diesel Issue </CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Diesel/DieselIssue/new")}
              >
                <Plus size={20} className="text-white" />
              </Button>
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <DataTable
            data={dieselIssueList}
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
    dieselIssue: state.dieselIssue,
  };
};

export default connect(mapStateToProps, {
  getDieselIssue,
  deleteDieselIssue,
})(DieselIssue);
