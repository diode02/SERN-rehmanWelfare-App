import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCustomersFetching } from "../../redux/customers/customers.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.com";
import PayInstallmentsPage from "./pay-installments.com";
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCustomersFetching,
});

const PayInstallemntsPageSpinner = compose(
  connect(mapStateToProps),
  WithSpinner
)(PayInstallmentsPage);

export default PayInstallemntsPageSpinner;
