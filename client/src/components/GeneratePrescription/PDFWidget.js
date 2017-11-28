import React, { Component } from "react";
// IMPORTANT: cant require from 'react-pdf' because of some pdf.worker.js issue
// https://github.com/wojtekmaj/react-pdf#webpack
import { Document, Page } from "react-pdf/build/entry.webpack";
class PDFWidget extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;
    const { file } = this.props;
    return (
      <div>
        <Document file={file} onLoadSuccess={this.onDocumentLoad}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    );
  }
}

export default PDFWidget;
