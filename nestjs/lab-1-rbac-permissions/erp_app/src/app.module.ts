import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InvoicesModule, DatabaseModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}
