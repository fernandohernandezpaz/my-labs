import { StatusRecordEnum } from '../enums/status-record.enum';
export type FiltersType = {
  status: StatusRecordEnum;
  dateFrom: string | null;
};
