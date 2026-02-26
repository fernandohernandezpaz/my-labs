import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120, 'Max 120 characters'),
});

export type CreateBrandSchema = z.infer<typeof createBrandSchema>;
