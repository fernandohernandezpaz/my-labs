import { Provider } from '@nestjs/common';
import { JwtConfigOptions } from './jwt.config';

export const JwtConfigProvider: Provider = {
  provide: JwtConfigOptions,
  useValue: JwtConfigOptions.configure(),
};
