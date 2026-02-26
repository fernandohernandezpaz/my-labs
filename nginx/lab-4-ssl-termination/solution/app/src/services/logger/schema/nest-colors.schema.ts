import { clcColors as clc } from '../constants/clc-colors.constant';

export const nestColorsSchema: Record<string, (text: string) => string> = {
  debug: clc.magentaBright,
  error: clc.red,
  info: clc.green,
  log: clc.green,
  verbose: clc.cyanBright,
  warn: clc.yellow,
};
