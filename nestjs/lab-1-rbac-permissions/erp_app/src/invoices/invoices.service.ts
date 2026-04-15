import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesRepository } from 'src/database/repositories/invoices.repository';
import { Invoice } from 'src/database/entities/invoices.entity';

@Injectable()
export class InvoicesService {
  constructor(private readonly invoiceRepository: InvoicesRepository) {}

  create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(createInvoiceDto);
    return this.invoiceRepository.save(invoice);
  }

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }
}
