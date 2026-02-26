export type PrintFormatInfo = {
  appName?: string;
  caller?: string;
  context?: string;
  correlationId?: string;
  error?: Error | string;
  level: string;
  message: string;
  ms?: string;
  timestamp?: string;
};
