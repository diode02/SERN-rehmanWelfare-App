import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ invoice }) => {
  return (
    <Fragment>
      <View style={styles.row}>
        <Text style={styles.description}>DISCOUNT</Text>
        <Text style={styles.total}>{invoice.discount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>ADVANCE</Text>
        <Text style={styles.total}>{invoice.advance}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL PAYABLE</Text>
        <Text style={styles.total}>{invoice.items[0].tot}</Text>
      </View>
    </Fragment>
  );
};

export default InvoiceTableFooter;
