import { Provider } from '@nestjs/common';
import { GlobalConfigOptions } from './global-configs';
import { GlobalConfigsService } from './global-configs.service';

export const GLOBAL_CONFIGS = 'GLOBAL_CONFIGS';

export const GlobalConfigsProvider: Provider<GlobalConfigOptions> = {
  provide: GLOBAL_CONFIGS,
  inject: [GlobalConfigsService],
  useFactory: (globalConfigsService: GlobalConfigsService) =>
    globalConfigsService.getGlobalConfig(),
};
