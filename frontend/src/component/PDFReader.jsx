import React from 'react';

const PDFReader = ({ contentURL }) => {
  // Appending #toolbar=0 to disable the PDF toolbar (no download or print)
  const pdfURL = `${contentURL}`;

  return (
    <iframe
      src={pdfURL}
      title="PDF Viewer"
      className="w-full h-full"
      style={{
        border: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default PDFReader;