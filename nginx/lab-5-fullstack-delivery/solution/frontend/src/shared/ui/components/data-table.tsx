import { Table } from 'antd';
import type { TableProps } from 'antd';

type DataTableProps<T extends object> = TableProps<T>;

export const DataTable = <T extends object>(props: DataTableProps<T>) => (
  <Table<T>
    bordered
    pagination={{ pageSize: 10, showSizeChanger: false }}
    rowKey="id"
    {...props}
  />
);
