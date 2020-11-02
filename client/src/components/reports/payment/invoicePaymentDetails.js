import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderColor: "#bff0fd",
    borderWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "70%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  amount: {
    width: "30%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoicePaymentDetails = ({ installment }) => (
  <Fragment>
    <View style={{ ...styles.row, marginTop: 47 }}>
      <Text style={styles.description}>Installment Payment ID</Text>
      <Text style={styles.amount}>{installment.installments_payment_id}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Amount To Receive</Text>
      <Text style={styles.amount}>{installment.amount_to_receive}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Due Date</Text>
      <Text style={styles.amount}>{installment.due_date}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Penality</Text>
      <Text style={styles.amount}>{installment.penality}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Total Amount Still To Pay</Text>
      <Text style={styles.amount}>{installment.previous_outstanding}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Amount Received</Text>
      <Text style={styles.amount}>{installment.amount_received}</Text>
    </View>
  </Fragment>
);

export default InvoicePaymentDetails;
