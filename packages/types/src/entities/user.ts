import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['customer', 'partner']),
});

export type User = z.infer<typeof UserSchema>;
