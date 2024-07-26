import React, { Component } from 'react';
import axios from 'axios';

class EditData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: props.editdata ? props.editdata.currency : '',
      invBasicAmt: props.editdata ? props.editdata.invBasicAmt : '',
      taxAmt: props.editdata ? props.editdata.taxAmt : '',
      totalInvAmtInclTax: props.editdata ? props.editdata.totalInvAmtInclTax : '',
      advancePaid: props.editdata ? props.editdata.advancePaid : '',
      tcsApplicable: props.editdata ? props.editdata.tcsApplicable : '',
      netPayableAmtExclTDS: props.editdata ? props.editdata.netPayableAmtExclTDS : '',
      _id: props.editdata ? props.editdata._id : '', // Initialize _id
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editdata !== this.props.editdata) {
      this.setState({
        currency: this.props.editdata ? this.props.editdata.currency : '',
        invBasicAmt: this.props.editdata ? this.props.editdata.invBasicAmt : '',
        taxAmt: this.props.editdata ? this.props.editdata.taxAmt : '',
        totalInvAmtInclTax: this.props.editdata ? this.props.editdata.totalInvAmtInclTax : '',
        advancePaid: this.props.editdata ? this.props.editdata.advancePaid : '',
        tcsApplicable: this.props.editdata ? this.props.editdata.tcsApplicable : '',
        netPayableAmtExclTDS: this.props.editdata ? this.props.editdata.netPayableAmtExclTDS : '',
        _id: this.props.editdata ? this.props.editdata._id : '', // Update _id
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    const { currency, invBasicAmt, taxAmt, totalInvAmtInclTax, advancePaid, tcsApplicable, netPayableAmtExclTDS, _id } = this.state;
  
    const putData = {
      currency,
      invBasicAmt,
      taxAmt,
      totalInvAmtInclTax,
      advancePaid,
      tcsApplicable,
      netPayableAmtExclTDS,
    };

    axios.put(`https://invoice-backend-zq1u.onrender.com/api/invoices/${_id}`, putData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        this.props.editClose();
        this.props.fetchData();
       
        // Handle success response here, maybe notify parent component or reset form
      })
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  }

  render() {
    const { currency, invBasicAmt, taxAmt, totalInvAmtInclTax, advancePaid, tcsApplicable, netPayableAmtExclTDS } = this.state;

    return (
      <div className='mainform'>
        <form className='subform' >
          <div >
            <label>Currency:</label>
            <input 
             className='input-field'
              type="text" 
              name="currency" 
              value={currency} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>Invoice Basic Amount:</label>
            <input 
             className='input-field'
              type="number" 
              name="invBasicAmt" 
              value={invBasicAmt} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>Tax Amount:</label>
            <input 
             className='input-field'
              type="number" 
              name="taxAmt" 
              value={taxAmt} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>Total Invoice Amount Incl. Tax:</label>
            <input 
             className='input-field'
              type="number" 
              name="totalInvAmtInclTax" 
              value={totalInvAmtInclTax} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>Advance Paid:</label>
            <input 
             className='input-field'
              type="number" 
              name="advancePaid" 
              value={advancePaid} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>TCS Applicable:</label>
            <input 
             className='input-field'
              type="text" 
              name="tcsApplicable" 
              value={tcsApplicable} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>Net Payable Amount (Excl. of TDS):</label>
            <input 
             className='input-field'
              type="number" 
              name="netPayableAmtExclTDS" 
              value={netPayableAmtExclTDS} 
              onChange={this.handleChange} 
            />
          </div>
          <button className='submitbtn' type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default EditData;
