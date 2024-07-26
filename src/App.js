import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PdfView  from './Components/PdfView';
import DataView from './Components/dataView';


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/dataview/:id" element={<PdfView  />} />
          <Route path="/" element={<DataView/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;


