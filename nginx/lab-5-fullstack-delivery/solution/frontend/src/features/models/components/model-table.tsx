import { Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataTable } from '@/shared/ui/components/data-table';
import type { ModelEntity } from '@/features/models/model/model.types';
import type { Brand } from '@/features/brands/model/brand.types';
import { toDateTime } from '@/shared/utils/format';

type ModelTableProps = {
  brands: Brand[];
  data: ModelEntity[];
  loading?: boolean;
  onDelete: (row: ModelEntity) => void;
  onEdit: (row: ModelEntity) => void;
};

export const ModelTable = ({ brands, data, loading, onDelete, onEdit }: ModelTableProps) => {
  const brandMap = new Map(brands.map((b) => [b.id, b.name]));

  const columns: ColumnsType<ModelEntity> = [
    { dataIndex: 'name', title: 'Name' },
    { dataIndex: 'brandId', render: (v: string) => brandMap.get(v) ?? v, title: 'Brand' },
    { dataIndex: 'updatedAt', render: (v: string) => toDateTime(v), title: 'Updated At' },
    {
      key: 'actions',
      render: (_, row) => (
        <Space>
          <Button onClick={() => onEdit(row)} size="small">Edit</Button>
          <Popconfirm title="Delete model?" onConfirm={() => onDelete(row)}>
            <Button danger size="small">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      title: 'Actions',
    },
  ];

  return <DataTable columns={columns} dataSource={data} loading={loading} />;
};
