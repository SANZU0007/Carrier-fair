import React, { Component } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import 'devextreme/dist/css/dx.light.css';
import EditData from './EditData';
import Create from './create';
import { Navigate } from 'react-router-dom';

class DataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      Addopen: false,
      editopen: false,
      selectedId: null,
      editdata: null,
      navigate: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const ApiUrl = "https://invoice-backend-zq1u.onrender.com/api/invoices";
    axios.get(ApiUrl)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  handleEdit = (data) => {
    this.setState({ editdata: data, editopen: true });
  };

  handleDelete = (id) => {
    console.log(id);
    this.setState({ selectedId: id, open: true });
  };

  handleConfirmDelete = () => {
    const { selectedId } = this.state;
    if (!selectedId) {
      console.error('No ID selected for deletion');
      return;
    }
    axios.delete(`https://invoice-backend-zq1u.onrender.com/api/invoices/${selectedId}`)
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        this.fetchData();
      })
      .catch(error => {
        console.error('There was an error deleting the data!', error);
      })
      .finally(() => {
        this.setState({ open: false });
      });
  };

  handleCancelDelete = () => {
    this.setState({ open: false });
  };

  editClose = () => {
    this.setState({ editopen: false });
  };

  openSubmit = () => {
    this.setState({ Addopen: true });
  };

  AddClose = () => {
    this.setState({ Addopen: false });
  };

  handleView = (id) => {
    this.setState({ navigate: `/dataview/${id}` });
  };

  actionCellTemplate = (cellData) => {
    const { data } = cellData;

    return (
      <div>
        <IconButton onClick={() => this.handleView(data._id)}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => this.handleEdit(data)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => this.handleDelete(data._id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  render() {
    const { data, open, Addopen, editopen, editdata, navigate } = this.state;

    if (navigate) {
      return <Navigate to={navigate} />;
    }

    return (
      <div>
        <nav className='navbar'>
          <div style={{ display: "flex" }}>
            <p className='id-title'> Invoice Management System</p>
          </div>
        </nav>
        <br></br>
        <br></br>
        <Button variant='outlined' onClick={this.openSubmit}>Create</Button>
        <br></br>
        <br></br>
        <DataGrid
         paging={{ pageSize: 5 }}
          dataSource={data}
          showBorders={true}
        >
          <Column
            caption="Actions"
            cellRender={this.actionCellTemplate}
          />
          <Column
            dataField="currency"
            caption="Currency"
          />
          <Column
            dataField="invBasicAmt"
            caption="Invoice Basic Amount"
            dataType="number"
            format="currency"
          />
          <Column
            dataField="taxAmt"
            caption="Tax Amount"
            dataType="number"
            format="currency"
          />
          <Column
            dataField="totalInvAmtInclTax"
            caption="Total Invoice Amount Incl. Tax"
            dataType="number"
            format="currency"
          />
          <Column
            dataField="advancePaid"
            caption="Advance Paid"
            dataType="number"
            format="currency"
          />
          <Column
            dataField="tcsApplicable"
            caption="TCS Applicable"
          />
          <Column
            dataField="netPayableAmtExclTDS"
            caption="Net Payable Amount (Excl. of TDS)"
            dataType="number"
            format="currency"
          />
        </DataGrid>

        <Dialog
          open={open}
          onClose={this.handleCancelDelete}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this item?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={editopen}
          onClose={this.editClose}
        >
          <DialogTitle>Edit Data</DialogTitle>
          <EditData editdata={editdata} editClose={this.editClose} fetchData={this.fetchData} />
        </Dialog>

        <Dialog
          open={Addopen}
          onClose={this.AddClose}
        >
          <DialogTitle>Add New Data</DialogTitle>
          <Create AddClose={this.AddClose} fetchData={this.fetchData} />
        </Dialog>
      </div>
    );
  }
}

export default DataView;

