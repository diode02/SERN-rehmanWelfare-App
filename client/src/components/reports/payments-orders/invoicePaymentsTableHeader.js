import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  no: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  am_to: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  am_re: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: "35%",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.no}>#</Text>
    <Text style={styles.am_to}>Amount To Receive</Text>
    <Text style={styles.am_re}>Amount Receieved</Text>
    <Text style={styles.date}>Due Date</Text>
  </View>
);

export default InvoiceTableHeader;
