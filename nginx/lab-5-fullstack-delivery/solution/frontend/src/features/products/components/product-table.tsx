import { Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataTable } from '@/shared/ui/components/data-table';
import type { Product } from '@/features/products/model/product.types';
import type { ModelEntity } from '@/features/models/model/model.types';
import { toCurrency, toDateTime } from '@/shared/utils/format';

type ProductTableProps = {
  data: Product[];
  loading?: boolean;
  models: ModelEntity[];
  onDelete: (row: Product) => void;
  onEdit: (row: Product) => void;
};

export const ProductTable = ({ data, loading, models, onDelete, onEdit }: ProductTableProps) => {
  const modelMap = new Map(models.map((model) => [model.id, model.name]));

  const columns: ColumnsType<Product> = [
    { dataIndex: 'name', title: 'Name' },
    { dataIndex: 'modelId', render: (v: string) => modelMap.get(v) ?? v, title: 'Model' },
    { dataIndex: 'price', render: (v: number) => toCurrency(v), title: 'Price' },
    { dataIndex: 'stock', title: 'Stock' },
    { dataIndex: 'updatedAt', render: (v: string) => toDateTime(v), title: 'Updated At' },
    {
      key: 'actions',
      render: (_, row) => (
        <Space>
          <Button onClick={() => onEdit(row)} size="small">Edit</Button>
          <Popconfirm title="Delete product?" onConfirm={() => onDelete(row)}>
            <Button danger size="small">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      title: 'Actions',
    },
  ];

  return <DataTable columns={columns} dataSource={data} loading={loading} />;
};
