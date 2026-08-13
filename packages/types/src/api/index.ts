import { z } from 'zod';

export const paginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number().int(),
    page: z.number().int(),
    pageSize: z.number().int(),
  });

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export const ApiErrorSchema = z.object({
  status: z.number(),
  message: z.string(),
  code: z.string().optional(),
});

export type ApiErrorType = z.infer<typeof ApiErrorSchema>;
