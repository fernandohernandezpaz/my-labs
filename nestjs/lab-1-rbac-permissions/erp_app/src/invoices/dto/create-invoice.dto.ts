import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createInvoiceSchema = z.object({
  amount: z.number().positive(),
  customer: z.string().min(1).max(255),
});

export class CreateInvoiceDto extends createZodDto(createInvoiceSchema) {}
