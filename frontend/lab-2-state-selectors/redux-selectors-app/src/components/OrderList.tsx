import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredOrders, selectUserDisplayName } from '../store/orderSelectors';
import { setStatusFilter, setDateFromFilter, setUserDisplayName } from '../store/ordersSlice';
import { StatusRecordEnum } from '../enums/status-record.enum';

export default function OrderList() {

  const dispatch = useDispatch();
  const filteredOrders = useSelector(selectFilteredOrders);
  const displayName = useSelector(selectUserDisplayName);
  const status = useSelector((state) => state.orders.filters.status);
  const dateFrom = useSelector((state) => state.orders.filters.dateFrom);

  return (
    <section>
      <h2>Orders</h2>
      <p>Current user: {displayName}</p>
      <p>Orders lenght ({filteredOrders.length})</p>

      <div>
        <label htmlFor="status">Status:{ ' ' }
          <select
            id="status"
            value={status}
            onChange={(e) => dispatch(setStatusFilter(e.target.value as StatusRecordEnum))}>
            <option value={StatusRecordEnum.ALL}>All</option>
            <option value={StatusRecordEnum.PENDING}>Pending</option>
            <option value={StatusRecordEnum.SHIPPED}>Shipped</option>
          </select>
        </label>

        <label
          htmlFor="dateFrom">
            Date from:{' '}
            <input
              id="dateFrom"
              type="date"
              value={dateFrom || null}
              onChange={(e) => dispatch(setDateFromFilter(e.target.value || null))}
              />
        </label>
        <button onClick={() => dispatch(setUserDisplayName(`${displayName}*`))}>
          Touch user only(Should NOT recompute filter)
        </button>
      </div>

      <ul>
        {filteredOrders.map(({ id, status, placedAt}) => (
          <li key={id}>
            {id} — {status} — {placedAt.slice(0, 10)}
          </li>
        ))}
      </ul>
    </section>
  )
};
