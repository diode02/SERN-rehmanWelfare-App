import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsOrdersFetching } from "../../redux/orders/orders.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.com";
import CustomersPage from "./customers.com";
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsOrdersFetching,
});

const CustomersPageSpinner = compose(
  connect(mapStateToProps),
  WithSpinner
)(CustomersPage);

export default CustomersPageSpinner;
