import React from "react";
import { Page, Document, StyleSheet, View } from "@react-pdf/renderer";
import InvoiceTitle from "./invoiceTitle";
import BillTo from "./billTo";
import InvoiceNo from "./invoiceNo";
import InvoiceItemsTable from "./invoiceItemsTable";
import InvoiceThankYouMsg from "./invoiceThankYouMsg";
import InvoicePaymentsTable from "./payments-orders/invoicePaymentsTable";
import InvoicePaymentDetails from "./payment/invoicePaymentDetails";
// import logo from "../../../src/logo.png";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* <Image style={styles.logo} src={logo} /> */}
      <InvoiceTitle title="Rehman Welfare" />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      {invoice.ordOrIns !== "ins" ? (
        <View>
          <InvoiceItemsTable invoice={invoice} />
          <InvoicePaymentsTable invoice={invoice} />
        </View>
      ) : (
        <InvoicePaymentDetails installment={invoice.insts[0]} />
      )}
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);

export default Invoice;
