import { createSelector } from '@reduxjs/toolkit';
import { StatusRecordEnum } from '../enums/status-record.enum';
import type { OrderItemType } from '../types/order-item.type';

const selectOrdersState = (state) => state.orders;

const selectOrderList = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.list,
);

const selectStatusFilter = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.filters.status,
);

const selectDateFromFilter = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.filters.dateFrom,
);

export const selectUserDisplayName = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.user.displayName,
);

export const selectFilteredOrders = createSelector(
  [selectOrderList, selectStatusFilter, selectDateFromFilter],
  (orders, status, dateFrom) => {
    console.log('selectFilteredOrders: recomputing filter...');
    return orders.filter((order: OrderItemType) => {

      const okStatus:boolean = status === StatusRecordEnum.ALL || order.status === status;
      const orderDay: string = order.placedAt.slice(0, 10);
      const okDate = !dateFrom || orderDay >= dateFrom;
      return okStatus && okDate;
    });
  }
)

