import { useState } from 'react';
import { Button, Card, Empty, Skeleton, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModels } from '@/features/models/hooks/use-models';
import { useModelMutations } from '@/features/models/hooks/use-model-mutations';
import { ModelFormModal } from '@/features/models/components/model-form-modal';
import { ModelTable } from '@/features/models/components/model-table';
import { useBrands } from '@/features/brands/hooks/use-brands';
import type { ModelEntity } from '@/features/models/model/model.types';
import type { CreateModelSchema } from '@/features/models/model/model.schema';
import { useNotification } from '@/shared/hooks/use-notification';
import { toApiError } from '@/shared/utils/errors';

export const ModelsPage = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ModelEntity | null>(null);
  const { data, isLoading } = useModels();
  const { data: brands = [] } = useBrands();
  const { createMutation, updateMutation, deleteMutation } = useModelMutations();
  const { success, error } = useNotification();

  const closeModal = () => {
    setCurrent(null);
    setOpen(false);
  };

  const submit = async (values: CreateModelSchema) => {
    try {
      if (current) {
        await updateMutation.mutateAsync({ id: current.id, payload: values });
        success('Model updated');
      } else {
        await createMutation.mutateAsync(values);
        success('Model created');
      }
      closeModal();
    } catch (err) {
      error('Action failed', toApiError(err).message);
    }
  };

  const remove = async (row: ModelEntity) => {
    try {
      await deleteMutation.mutateAsync(row.id);
      success('Model deleted');
    } catch (err) {
      error('Delete failed', toApiError(err).message);
    }
  };

  return (
    <Card>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Models</Typography.Title>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>
          New Model
        </Button>
      </div>

      {isLoading ? (
        <Skeleton active />
      ) : data?.length ? (
        <ModelTable
          brands={brands}
          data={data}
          onDelete={(row) => void remove(row)}
          onEdit={(row) => {
            setCurrent(row);
            setOpen(true);
          }}
        />
      ) : (
        <Empty description="No models found" />
      )}

      <ModelFormModal
        brands={brands}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        current={current}
        onClose={closeModal}
        onSubmit={(values) => void submit(values)}
        open={open}
      />
    </Card>
  );
};
