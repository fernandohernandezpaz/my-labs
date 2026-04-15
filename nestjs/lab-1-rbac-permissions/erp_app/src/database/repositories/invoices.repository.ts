import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from '../entities/invoices.entity';

@Injectable()
export class InvoicesRepository extends Repository<Invoice> {
  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }

  async findByCustomer(customer: string): Promise<Invoice[]> {
    return this.find({ where: { customer } });
  }
}
