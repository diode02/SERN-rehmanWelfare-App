import { createSelector } from "reselect";
const selectProducts = (state) => state.products.products;

// export const selectIsOrdersFetching = createSelector(
//   selectOrders,
//   (orders) => orders.isFetching
// );

export const selectProductIdName = createSelector(selectProducts, (products) =>
  products.map((product) => {
    return {
      label: product.product_id + "---" + product.product_name,
      value: product.product_id,
    };
  })
);
export const selectPrices = createSelector(selectProducts, (products) =>
  Object.assign(
    {},
    ...products.map((product) => ({ [product.product_id]: product.price }))
  )
);
