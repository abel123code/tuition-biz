import React from 'react';
const PDFReader = ({ contentURL }) => {
  // Appending #toolbar=0 to disable the PDF toolbar (no download or print)
  const pdfURL = `${contentURL}#toolbar=0`;
  return (
    <iframe
      src={pdfURL}
      title="PDF Viewer"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
    />
  );
};
export default PDFReader;