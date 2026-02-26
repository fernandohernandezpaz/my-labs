import { Module } from '@nestjs/common';
import { GlobalConfigsModule } from '@/configs/global-configs.module';
import { LoggerService } from './logger.service';

@Module({
  exports: [LoggerService],
  imports: [GlobalConfigsModule],
  providers: [LoggerService],
})
export class LoggerModule {}
