import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsOrdersFetching } from "../../redux/orders/orders.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.com";
import AllOrders from "./all-orders.com";
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsOrdersFetching,
});

const OrdersPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(AllOrders);

export default OrdersPageContainer;
