import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, Input, Select } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormModal } from '@/shared/ui/components/form-modal';
import { createModelSchema, type CreateModelSchema } from '@/features/models/model/model.schema';
import type { ModelEntity } from '@/features/models/model/model.types';
import type { Brand } from '@/features/brands/model/brand.types';

type ModelFormModalProps = {
  brands: Brand[];
  confirmLoading?: boolean;
  current?: ModelEntity | null;
  onClose: () => void;
  onSubmit: (values: CreateModelSchema) => void;
  open: boolean;
};

export const ModelFormModal = ({
  brands,
  confirmLoading,
  current,
  onClose,
  onSubmit,
  open,
}: ModelFormModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateModelSchema>({
    defaultValues: { brandId: '', name: '' },
    resolver: zodResolver(createModelSchema),
  });

  useEffect(() => {
    if (open) {
      reset({
        brandId: current?.brandId ?? '',
        name: current?.name ?? '',
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
      title={current ? 'Update Model' : 'Create Model'}
    >
      <Form layout="vertical">
        <Form.Item help={errors.name?.message} label="Name" validateStatus={errors.name ? 'error' : ''}>
          <Controller control={control} name="name" render={({ field }) => <Input {...field} />} />
        </Form.Item>
        <Form.Item help={errors.brandId?.message} label="Brand" validateStatus={errors.brandId ? 'error' : ''}>
          <Controller
            control={control}
            name="brandId"
            render={({ field }) => (
              <Select
                {...field}
                options={brands.map((brand) => ({ label: brand.name, value: brand.id }))}
                onChange={field.onChange}
                value={field.value || undefined}
              />
            )}
          />
        </Form.Item>
      </Form>
    </FormModal>
  );
};
