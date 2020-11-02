import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./invoiceTableHeader";
import InvoiceTableRow from "./invoiceTableRow";
import InvoiceTableBlankSpace from "./invoiceTableBlankSpace";
import InvoiceTableFooter from "./invoiceTableFooter";

const tableRowsCount = 3;

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
    <InvoiceTableRow items={invoice.items} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} />
    <InvoiceTableFooter invoice={invoice} />
  </View>
);

export default InvoiceItemsTable;
