import { z } from 'zod';

export const createProductSchema = z.object({
  modelId: z.string().uuid('Select a valid model'),
  name: z.string().min(1, 'Name is required').max(160, 'Max 160 characters'),
  price: z.number().min(0, 'Price must be >= 0').multipleOf(0.01),
  stock: z.number().int('Stock must be integer').min(0, 'Stock must be >= 0'),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
