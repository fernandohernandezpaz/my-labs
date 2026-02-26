import { useState } from 'react';
import { Button, Card, Empty, Skeleton, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProducts } from '@/features/products/hooks/use-products';
import { useProductMutations } from '@/features/products/hooks/use-product-mutations';
import { ProductFormModal } from '@/features/products/components/product-form-modal';
import { ProductTable } from '@/features/products/components/product-table';
import { useModels } from '@/features/models/hooks/use-models';
import type { Product } from '@/features/products/model/product.types';
import type { CreateProductSchema } from '@/features/products/model/product.schema';
import { useNotification } from '@/shared/hooks/use-notification';
import { toApiError } from '@/shared/utils/errors';

export const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Product | null>(null);
  const { data, isLoading } = useProducts();
  const { data: models = [] } = useModels();
  const { createMutation, updateMutation, deleteMutation } = useProductMutations();
  const { success, error } = useNotification();

  const closeModal = () => {
    setCurrent(null);
    setOpen(false);
  };

  const submit = async (values: CreateProductSchema) => {
    try {
      if (current) {
        await updateMutation.mutateAsync({ id: current.id, payload: values });
        success('Product updated');
      } else {
        await createMutation.mutateAsync(values);
        success('Product created');
      }
      closeModal();
    } catch (err) {
      error('Action failed', toApiError(err).message);
    }
  };

  const remove = async (row: Product) => {
    try {
      await deleteMutation.mutateAsync(row.id);
      success('Product deleted');
    } catch (err) {
      error('Delete failed', toApiError(err).message);
    }
  };

  return (
    <Card>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Products</Typography.Title>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>
          New Product
        </Button>
      </div>

      {isLoading ? (
        <Skeleton active />
      ) : data?.length ? (
        <ProductTable
          data={data}
          models={models}
          onDelete={(row) => void remove(row)}
          onEdit={(row) => {
            setCurrent(row);
            setOpen(true);
          }}
        />
      ) : (
        <Empty description="No products found" />
      )}

      <ProductFormModal
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        current={current}
        models={models}
        onClose={closeModal}
        onSubmit={(values) => void submit(values)}
        open={open}
      />
    </Card>
  );
};
