import { z } from 'zod';

export const createModelSchema = z.object({
  brandId: z.string().uuid('Select a valid brand'),
  name: z.string().min(1, 'Name is required').max(120, 'Max 120 characters'),
});

export type CreateModelSchema = z.infer<typeof createModelSchema>;
