import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import Invoice from "./invoice";

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
        <Text style={styles.total}>
          {Number.parseFloat(invoice.discount).toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>ADVANCE</Text>
        <Text style={styles.total}>
          {Number.parseFloat(invoice.advance).toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL PAYABLE</Text>
        <Text style={styles.total}>
          {Number.parseFloat(invoice.items[0].tot).toFixed(2)}
        </Text>
      </View>
    </Fragment>
  );
};

export default InvoiceTableFooter;
