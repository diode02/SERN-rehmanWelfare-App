import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "../reports/invoice";
import invoiceData from "../../data/invoice-data";

const InvoiceCom = () => {
  return (
    <PDFViewer width="100%" height="1200vh" className="app">
      <Invoice invoice={invoiceData} />
    </PDFViewer>
  );
};

export default InvoiceCom;
