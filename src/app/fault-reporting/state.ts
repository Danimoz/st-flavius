import type { FaultReportErrors } from '@/libs/validations';

export type FaultReportState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  errors?: FaultReportErrors;
};

export const initialFaultReportState: FaultReportState = {
  status: 'idle',
  message: '',
};
