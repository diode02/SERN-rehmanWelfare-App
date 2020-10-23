import React from "react";
import { useHistory } from "react-router-dom";

import { Box } from "@chakra-ui/core";
import { SimpleGrid } from "@chakra-ui/core";
import NewCustomer from "../../components/new-customer/new-customer.com";
const HomePage = (props) => {
  let history = useHistory();
  let items = [
    {
      label: "New Order",
      command: () => {
        history.push("/neworder");
      },
    },
    {
      label: "All orders",
      command: () => {
        history.push("/orders");
      },
    },
    {
      label: "Pay Installments",
      command: () => {
        history.push("/payinstallment");
      },
    },
    {
      label: "All Installments",
      command: () => {
        history.push("/all-installments");
      },
    },
    {
      label: "New Cutsomer",
      command: () => {
        history.push("/newcustomer");
      },
    },
    {
      label: "All Customers",
      command: () => {
        history.push("/customers");
      },
    },
  ];
  return (
    <Box>
      <SimpleGrid columns={3} spacing={10}>
        <Box bg="tomato" height="100px"></Box>
        <NewCustomer />
        <SimpleGrid columns={3} spacing={10}>
          {items.map((item) => (
            <Box
              bg="tomato"
              height="100px"
              onClick={item.command}
              key={item.label}
            >
              {item.label}
            </Box>
          ))}
        </SimpleGrid>
        <Box bg="tomato" height="100px"></Box>
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
