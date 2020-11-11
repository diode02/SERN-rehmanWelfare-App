import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./invoiceTableHeader";
import InvoiceTableRow from "./invoiceTableRow";
import InvoiceTableBlankSpace from "./invoiceTableBlankSpace";
import InvoiceTableFooter from "./invoiceTableFooter";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const InvoiceItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow order={invoice.order} />
    <InvoiceTableBlankSpace rowsCount={2} />
    <InvoiceTableFooter invoice={invoice} />
  </View>
);

export default InvoiceItemsTable;
