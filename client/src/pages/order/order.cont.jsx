import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCustomersFetching } from "../../redux/customers/customers.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.com";
import OrderPage from "./order.com";
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCustomersFetching,
});

const OrderPageSpinner = compose(
  connect(mapStateToProps),
  WithSpinner
)(OrderPage);

export default OrderPageSpinner;
