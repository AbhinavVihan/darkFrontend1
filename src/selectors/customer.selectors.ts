import { createSelector } from "reselect";
import { customerStateSelector } from "./app.selectors";

export const orderIdsSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.orderArray
);

export const OrdersSelectors = createSelector(
  [customerStateSelector],
  (customerState) => customerState.orders
);

export const myOrdersSelectors = createSelector(
  [orderIdsSelector, OrdersSelectors],
  (Ids, orders) => {
    const Orders = Ids.map((i) => orders[i]);
    return Orders;
  }
);

export const ordersLoadingSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.loadingOne
);

export const retailorAllOrderIdsSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.retailorAllOrderIds
);

export const retailorAllOrdersSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.retailorAllOrders
);

export const retailorAllOrderRealSelector = createSelector(
  [retailorAllOrderIdsSelector, retailorAllOrdersSelector],
  (Ids, orders) => {
    const order = Ids.map((i) => orders[i]);
    return order;
  }
);
export const retailorAllOrdersLoadingSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.loadingList
);

export const retailorLoginLoadingSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.loadingOne
);

export const customerIdSelector = createSelector(
  [customerStateSelector],
  (customerState) => customerState.cId
);

export const customertoSelect = createSelector(
  [customerStateSelector],
  (customerState) => customerState.customer
);

export const customerSelector = createSelector(
  [customertoSelect, customerIdSelector],
  (customerState, id) => {
    const c = id && customerState[id];
    return c;
  }
);
