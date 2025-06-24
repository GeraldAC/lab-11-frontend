import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  role: z.string().optional(),
  email: z.string().email().optional(),
});

export type User = z.infer<typeof UserSchema>;
