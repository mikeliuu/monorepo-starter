import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  createdAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CreateProductInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  description: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type CreateProductInput = z.infer<typeof CreateProductInputSchema>;
