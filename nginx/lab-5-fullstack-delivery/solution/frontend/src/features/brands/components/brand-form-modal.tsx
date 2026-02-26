import { Controller, useForm } from 'react-hook-form';
import { Form, Input } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormModal } from '@/shared/ui/components/form-modal';
import { createBrandSchema, type CreateBrandSchema } from '@/features/brands/model/brand.schema';
import type { Brand } from '@/features/brands/model/brand.types';
import { useEffect } from 'react';

type BrandFormModalProps = {
  confirmLoading?: boolean;
  current?: Brand | null;
  onClose: () => void;
  onSubmit: (values: CreateBrandSchema) => void;
  open: boolean;
};

export const BrandFormModal = ({
  confirmLoading,
  current,
  onClose,
  onSubmit,
  open,
}: BrandFormModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBrandSchema>({
    defaultValues: { name: '' },
    resolver: zodResolver(createBrandSchema),
  });

  useEffect(() => {
    if (open) {
      reset({ name: current?.name ?? '' });
    }
  }, [current, open, reset]);

  return (
    <FormModal
      confirmLoading={confirmLoading}
      okText={current ? 'Update' : 'Create'}
      onCancel={onClose}
      onOk={() => void handleSubmit(onSubmit)()}
      open={open}
      title={current ? 'Update Brand' : 'Create Brand'}
    >
      <Form layout="vertical">
        <Form.Item help={errors.name?.message} label="Name" validateStatus={errors.name ? 'error' : ''}>
          <Controller control={control} name="name" render={({ field }) => <Input {...field} />} />
        </Form.Item>
      </Form>
    </FormModal>
  );
};
