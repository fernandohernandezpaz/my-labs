import { createSlice } from '@reduxjs/toolkit';
import type { OrderItemType } from '../types/order-item.type';
import type { FiltersType } from '../types/filters.type';
import type { UserType } from '../types/user.type';
import { StatusRecordEnum } from '../enums/status-record.enum';

const list: OrderItemType[] = [
  {
    id: 1,
    status: StatusRecordEnum.PENDING,
    placedAt: '2025-05-08T09:00:00.000Z'
  },
  {
    id: 2,
    status: StatusRecordEnum.PENDING,
    placedAt: '2025-05-08T09:00:00.000Z'
  },
  {
    id: 3,
    status: StatusRecordEnum.SHIPPED,
    placedAt: '2025-05-12T14:30:00.000Z'
  },
];

const filters: FiltersType = {
  status: StatusRecordEnum.ALL,
  dateFrom: null
}

const user: UserType = {
  displayName: 'Alice'
}

const initialState = {
  list,
  filters,
  user,
}

const slide = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
    setDateFromFilter(state, action) {
      state.filters.dateFrom = action.payload;
    },
    setUserDisplayName(state, action) {
      state.user.displayName = action.payload;
    }
  }
});

export const {
  setStatusFilter, setDateFromFilter, setUserDisplayName
} = slide.actions;

export default slide.reducer;
