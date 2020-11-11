import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./invoicePaymentsTableHeader";
import InvoiceTableRow from "./invoicePaymentsTableRow";

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
  </View>
);

export default InvoicePaymentsTable;
