import z from "zod"

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(255),
  username: z.string().trim().min(1).max(255),
  password: z.string().trim(),
  role: z.enum(["admin", "user"]),
})

export type UserSchema = z.infer<typeof userSchema>;