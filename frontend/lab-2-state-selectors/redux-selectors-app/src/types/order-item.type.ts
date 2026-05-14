import { StatusRecordEnum } from '../enums/status-record.enum'
export type OrderItemType = {
  id: number;
  status: StatusRecordEnum;
  placedAt: string;
};
