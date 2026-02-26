import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateGlobalConfigs } from './global-configs';
import { GlobalConfigsProvider } from './global-configs.provider';
import { GlobalConfigsService } from './global-configs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: validateGlobalConfigs,
    }),
  ],
  providers: [GlobalConfigsService, GlobalConfigsProvider],
  exports: [GlobalConfigsService, GlobalConfigsProvider],
})
export class GlobalConfigsModule {}
