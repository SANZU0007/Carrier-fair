import React, { Component } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import imagepdf from '../pdf/invoice.jpg';
import "../style/pdfview.css";
import { Button } from 'devextreme-react';

class PdfView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };

    const { id } = props.params;
    this.ApiUrl = `https://invoice-backend-zq1u.onrender.com/api/invoices/${id}`;
  }

  componentDidMount() {
    axios.get(this.ApiUrl)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <div>Please Wait...</div>;
    }

    return (
      <>
        <nav className='navbar'>
          <div style={{ display: "flex" }}>
            <p className='id-title'>{data._id} Ap Team</p>
          </div>
          <span style={{gap:"10px"}}>
           <Link to='/'  style={{ color:"black" ,margin:"5px" }} className='navbar-button' >Back to Home</Link>   
        
           <Button className='navbar-button'>Save to Draft</Button>
          </span>
        </nav>
        <div className="container">
          <div className="image-container">
            <img className="image" src={imagepdf} alt="Description of image" />
          </div>
          <div className="details-container">
            <h1 className="title">Data Details</h1>
            <p><strong className='strong-class'>ID:</strong> {data._id}</p>
            <p><strong className='strong-class'>Currency:</strong> {data.currency}</p>
            <p><strong className='strong-class'>Invoice Basic Amount:</strong> {data.invBasicAmt}</p>
            <p><strong className='strong-class'>Tax Amount:</strong> {data.taxAmt}</p>
            <p><strong className='strong-class'>Total Invoice Amount Incl. Tax:</strong> {data.totalInvAmtInclTax}</p>
            <p><strong className='strong-class'>Advance Paid:</strong> {data.advancePaid}</p>
            <p><strong className='strong-class'>TCS Applicable:</strong> {data.tcsApplicable}</p>
            <p><strong className='strong-class'>Net Payable Amount (Excl. of TDS):</strong> {data.netPayableAmtExclTDS}</p>
            <p><strong className='strong-class'>Action:</strong> {data.selectAction}</p>
          </div>
        </div>
        <footer className='footer'>
          <button size='small' className='btn-Class'>Currency:<span className='span'> {data.currency}</span></button>
          <button className='btn-Class'>Invoice Basic Amnt:<span className='span'> {data.invBasicAmt}</span></button>
          <button className='btn-Class'>Tax Amount: <span className='span'> {data.taxAmt}</span></button>
          <button className='btn-Class'>Total Invoice Amt Incl. Tax:<span className='span'> {data.totalInvAmtInclTax}</span></button>
          <button className='btn-Class'>Advance Paid:<span className='span'> {data.advancePaid}</span></button>
          <button className='btn-Class'>Net Payable Amt <span className='span'> {data.netPayableAmtExclTDS}</span></button>
          <select className='selection' id="bank-select" name="banks">
            <option value="" disabled selected>Select your bank</option>
            <option value="bank1">Bank of America</option>
            <option value="bank2">Chase Bank</option>
            <option value="bank3">Citibank</option>
            <option value="bank4">Wells Fargo</option>
            <option value="bank5">Goldman Sachs</option>
            <option value="bank6">Morgan Stanley</option>
          </select>
          <button className='reject'>Delete</button>
          <button className='Aprove'>Approve</button>
        </footer>
      </>
    );
  }
}

const PdfViewWrapper = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  
  return <PdfView {...props} params={params} navigate={navigate} />;
}

export default PdfViewWrapper;
