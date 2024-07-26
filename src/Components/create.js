import React, { Component } from 'react';
import axios from 'axios';
import "../style/create.css";
import { Button } from 'devextreme-react';


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
      invBasicAmt: '',
      taxAmt: '',
      totalInvAmtInclTax: '',
      advancePaid: '',
      tcsApplicable: '',
      netPayableAmtExclTDS: '',
      selectAction: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { currency, invBasicAmt, taxAmt, totalInvAmtInclTax, advancePaid, tcsApplicable, netPayableAmtExclTDS, selectAction } = this.state;

    const postData = {
      currency,
      invBasicAmt,
      taxAmt,
      totalInvAmtInclTax,
      advancePaid,
      tcsApplicable,
      netPayableAmtExclTDS,
      selectAction,
    };

    axios.post('https://invoice-backend-zq1u.onrender.com/api/invoices/', postData)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
        // Reset the form or handle success message
        this.props.AddClose();
        this.props.fetchData();
        this.setState({
          currency: '',
          invBasicAmt: '',
          taxAmt: '',
          totalInvAmtInclTax: '',
          advancePaid: '',
          tcsApplicable: '',
          netPayableAmtExclTDS: '',
          selectAction: '',
        });
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  }

  render() {
    const { currency, invBasicAmt, taxAmt, totalInvAmtInclTax, advancePaid, tcsApplicable, netPayableAmtExclTDS, selectAction } = this.state;

    return (
      <div className='mainform'>
      
        <form   className='subform'onSubmit={this.handleSubmit}>
          <div>
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
            <label>TCS Applicable Amt:</label>
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
          <div>
            <label>Select Action:</label>
            <input 
              className='input-field'
              type="text" 
              name="selectAction" 
              value={selectAction} 
              onChange={this.handleChange} 
            />
          </div>
          <button  className='submitbtn' type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Create;
