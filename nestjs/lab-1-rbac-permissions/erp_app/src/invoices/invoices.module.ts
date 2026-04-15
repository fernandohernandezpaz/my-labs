import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/database/entities/invoices.entity';
import { InvoicesRepository } from 'src/database/repositories/invoices.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [InvoicesController],
  imports: [TypeOrmModule.forFeature([Invoice]), AuthModule],
  providers: [InvoicesService, InvoicesRepository],
})
export class InvoicesModule { }
