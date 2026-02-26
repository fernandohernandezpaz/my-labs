import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, Input, InputNumber, Select } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormModal } from '@/shared/ui/components/form-modal';
import { createProductSchema, type CreateProductSchema } from '@/features/products/model/product.schema';
import type { Product } from '@/features/products/model/product.types';
import type { ModelEntity } from '@/features/models/model/model.types';

type ProductFormModalProps = {
  confirmLoading?: boolean;
  current?: Product | null;
  models: ModelEntity[];
  onClose: () => void;
  onSubmit: (values: CreateProductSchema) => void;
  open: boolean;
};

export const ProductFormModal = ({
  confirmLoading,
  current,
  models,
  onClose,
  onSubmit,
  open,
}: ProductFormModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    defaultValues: { modelId: '', name: '', price: 0, stock: 0 },
    resolver: zodResolver(createProductSchema),
  });

  useEffect(() => {
    if (open) {
      reset({
        modelId: current?.modelId ?? '',
        name: current?.name ?? '',
        price: current?.price ?? 0,
        stock: current?.stock ?? 0,
      });
    }
  }, [current, open, reset]);

  return (
    <FormModal
      confirmLoading={confirmLoading}
      okText={current ? 'Update' : 'Create'}
      onCancel={onClose}
      onOk={() => void handleSubmit(onSubmit)()}
      open={open}
      title={current ? 'Update Product' : 'Create Product'}
    >
      <Form layout="vertical">
        <Form.Item help={errors.name?.message} label="Name" validateStatus={errors.name ? 'error' : ''}>
          <Controller control={control} name="name" render={({ field }) => <Input {...field} />} />
        </Form.Item>

        <Form.Item help={errors.modelId?.message} label="Model" validateStatus={errors.modelId ? 'error' : ''}>
          <Controller
            control={control}
            name="modelId"
            render={({ field }) => (
              <Select
                {...field}
                options={models.map((model) => ({ label: model.name, value: model.id }))}
                onChange={field.onChange}
                value={field.value || undefined}
              />
            )}
          />
        </Form.Item>

        <Form.Item help={errors.price?.message} label="Price" validateStatus={errors.price ? 'error' : ''}>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <InputNumber
                min={0}
                precision={2}
                style={{ width: '100%' }}
                value={field.value}
                onChange={(value) => field.onChange(Number(value ?? 0))}
              />
            )}
          />
        </Form.Item>

        <Form.Item help={errors.stock?.message} label="Stock" validateStatus={errors.stock ? 'error' : ''}>
          <Controller
            control={control}
            name="stock"
            render={({ field }) => (
              <InputNumber
                min={0}
                precision={0}
                style={{ width: '100%' }}
                value={field.value}
                onChange={(value) => field.onChange(Number(value ?? 0))}
              />
            )}
          />
        </Form.Item>
      </Form>
    </FormModal>
  );
};
