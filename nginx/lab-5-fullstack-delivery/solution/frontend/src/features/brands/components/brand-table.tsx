import { Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataTable } from '@/shared/ui/components/data-table';
import type { Brand } from '@/features/brands/model/brand.types';
import { toDateTime } from '@/shared/utils/format';

type BrandTableProps = {
  data: Brand[];
  loading?: boolean;
  onDelete: (row: Brand) => void;
  onEdit: (row: Brand) => void;
};

export const BrandTable = ({ data, loading, onDelete, onEdit }: BrandTableProps) => {
  const columns: ColumnsType<Brand> = [
    { dataIndex: 'name', title: 'Name' },
    { dataIndex: 'createdBy', title: 'Created By' },
    { dataIndex: 'updatedAt', render: (v: string) => toDateTime(v), title: 'Updated At' },
    {
      key: 'actions',
      render: (_, row) => (
        <Space>
          <Button onClick={() => onEdit(row)} size="small">Edit</Button>
          <Popconfirm
            title="Delete brand?"
            onConfirm={() => onDelete(row)}
          >
            <Button danger size="small">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      title: 'Actions',
    },
  ];

  return <DataTable columns={columns} dataSource={data} loading={loading} />;
};
