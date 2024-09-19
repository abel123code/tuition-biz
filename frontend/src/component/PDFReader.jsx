import React from 'react';

const PDFReader = ({ contentURL, height }) => {
  // Appending #toolbar=0 to disable the PDF toolbar
  const pdfURL = `${contentURL}#toolbar=0`;

  return (
    <div
      style={{
        width: '100%',
        height: height,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch', // Enables momentum scrolling on iOS
      }}
    >
      <iframe
        src={pdfURL}
        title="PDF Viewer"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default PDFReader;
