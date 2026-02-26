import { useState } from 'react';
import { Button, Card, Empty, Skeleton, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useBrands } from '@/features/brands/hooks/use-brands';
import { useBrandMutations } from '@/features/brands/hooks/use-brand-mutations';
import { BrandFormModal } from '@/features/brands/components/brand-form-modal';
import { BrandTable } from '@/features/brands/components/brand-table';
import type { Brand } from '@/features/brands/model/brand.types';
import type { CreateBrandSchema } from '@/features/brands/model/brand.schema';
import { useNotification } from '@/shared/hooks/use-notification';
import { toApiError } from '@/shared/utils/errors';

export const BrandsPage = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Brand | null>(null);
  const { data, isLoading } = useBrands();
  const { createMutation, updateMutation, deleteMutation } = useBrandMutations();
  const { success, error } = useNotification();

  const closeModal = () => {
    setCurrent(null);
    setOpen(false);
  };

  const submit = async (values: CreateBrandSchema) => {
    try {
      if (current) {
        await updateMutation.mutateAsync({ id: current.id, payload: values });
        success('Brand updated');
      } else {
        await createMutation.mutateAsync(values);
        success('Brand created');
      }
      closeModal();
    } catch (err) {
      error('Action failed', toApiError(err).message);
    }
  };

  const remove = async (row: Brand) => {
    try {
      await deleteMutation.mutateAsync(row.id);
      success('Brand deleted');
    } catch (err) {
      error('Delete failed', toApiError(err).message);
    }
  };

  return (
    <Card>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Brands</Typography.Title>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>
          New Brand
        </Button>
      </div>

      {isLoading ? (
        <Skeleton active />
      ) : data?.length ? (
        <BrandTable
          data={data}
          onDelete={(row) => void remove(row)}
          onEdit={(row) => {
            setCurrent(row);
            setOpen(true);
          }}
        />
      ) : (
        <Empty description="No brands found" />
      )}

      <BrandFormModal
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        current={current}
        onClose={closeModal}
        onSubmit={(values) => void submit(values)}
        open={open}
      />
    </Card>
  );
};
