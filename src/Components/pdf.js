import React from 'react';
import { Document, Page } from 'react-pdf';
import pdfFile from '../pdf/image.pdf';

const Pdf = () => {
  return (
    <div>
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => console.log(`Loaded ${numPages} pages`)}
        onLoadError={(error) => console.error('Error loading PDF:', error)}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default Pdf;


