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
    fontStyle: "bold",
  },
  no: {
    width: "5%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  am_to: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  date: {
    width: "35%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ insts }) => {
  const rows = insts.map((installment) => (
    <View style={styles.row} key={installment.installment_no.toString()}>
      <Text style={styles.no}>{installment.installment_no}</Text>
      <Text style={styles.am_to}>{installment.amount_to_receive}</Text>
      <Text style={styles.am_to}>{installment.amount_received}</Text>
      <Text style={styles.date}>{installment.due_date}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
