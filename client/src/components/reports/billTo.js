import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 16,
  },
  billTo: {
    marginTop: 10,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>CNIC:{invoice.cid}</Text>

    <Text>{invoice.first_name + " " + invoice.last_name}</Text>
    <Text>{invoice.address}</Text>
    <Text>{invoice.mobile}</Text>
  </View>
);

export default BillTo;
