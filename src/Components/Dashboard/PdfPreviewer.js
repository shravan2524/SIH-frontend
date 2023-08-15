import React, { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import SimpleLoader from './SimpleLoader';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
const pdf = require('./SIH_Doc.pdf');

/**
 * Render PDF in a component
 * @docs : https://www.npmjs.com/package/react-pdf
 * @param file
 * @param loading
 * @constructor
 */

 function GetFilename(url) {
	return('Auth Letter');
}

function PdfPreviewer() {
	console.log(pdf);
  const [nrPages, setNrPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNrPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error(error);
  };

  const onLoadError = (error) => {
    console.error(error);
  };

  const simpleLoader = useMemo(() => <SimpleLoader isLoading text="Loading invoice file ..." />, []);

  return (
    <div className="col-12 m-2 p-1">
      <div className="d-flex justify-content-center align-items-center">
        <Document
          file={pdf}
          onSourceError={onDocumentLoadError}
          loading={simpleLoader}
          onLoadError={onLoadError}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <div className="container">
            {[...Array(nrPages)].map((x, i) => (
              <div className="row justify-content-md-center my-3" key={i}>
                <Page pageNumber={i + 1} loading={simpleLoader} />
              </div>
            ))}
          </div>
        </Document>
      </div>

    </div>
  );
}

export default PdfPreviewer;
