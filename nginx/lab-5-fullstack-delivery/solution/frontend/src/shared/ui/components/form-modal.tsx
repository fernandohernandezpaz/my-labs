import type { PropsWithChildren } from 'react';
import { Modal } from 'antd';

type FormModalProps = PropsWithChildren<{
  confirmLoading?: boolean;
  okText?: string;
  onCancel: () => void;
  onOk: () => void;
  open: boolean;
  title: string;
}>;

export const FormModal = ({
  children,
  confirmLoading,
  okText,
  onCancel,
  onOk,
  open,
  title,
}: FormModalProps) => (
  <Modal
    confirmLoading={confirmLoading}
    okText={okText}
    onCancel={onCancel}
    onOk={onOk}
    open={open}
    title={title}
  >
    {children}
  </Modal>
);
