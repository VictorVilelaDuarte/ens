import React, { useState, useEffect } from 'react';
import { Document, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';

import { Container, Principal, Controls } from './styles';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Pdf() {
  const location = useLocation();
  const [pdf, setPdf] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPdf(location.state);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onMinus() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function onPlus() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <Container>
      <Document
        loading="Carregando o PDF..."
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Principal scale={0.9} pageNumber={pageNumber} />
      </Document>
      <p>
        <Controls onClick={() => onMinus()}> {`<`} </Controls>
        {`Página ${pageNumber} de ${numPages}`}
        <Controls onClick={() => onPlus()}> {`>`} </Controls>
      </p>
    </Container>
  );
}

export default Pdf;
