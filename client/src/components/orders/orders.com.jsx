import React from "react";
import { List, Text, Box, ListItem, ListIcon } from "@chakra-ui/core";
const Order = ({
  order: { order_id, customer_id, product_id, order_status },
}) => {
  return (
    <ListItem>
      <Box fontSize="md">
        {order_id} {customer_id} {product_id}
        <ListIcon
          icon={order_status ? "check" : "close"}
          color={order_status ? "green.500" : "red.500"}
        />
      </Box>
    </ListItem>
  );
};

export default Order;
