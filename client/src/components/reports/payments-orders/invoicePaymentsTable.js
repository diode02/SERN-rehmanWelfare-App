import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./invoicePaymentsTableHeader";
import InvoiceTableRow from "./invoicePaymentsTableRow";
import InvoiceTableBlankSpace from "./invoicePaymentsTableBlankSpace";

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

const InvoicePaymentsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <View>
      <Text>Installments Plan</Text>
    </View>
    <InvoiceTableHeader />
    <InvoiceTableRow insts={invoice.insts} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} />
  </View>
);

export default InvoicePaymentsTable;
