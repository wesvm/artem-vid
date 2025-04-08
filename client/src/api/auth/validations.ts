import z from "zod";

export const authSchema = z.object({
  username: z.string().trim().min(1, "El nombre de usuario es requerido"),
  password: z.string().trim().min(1, "La contraseña es requerida"),
});

export type AuthSchema = z.infer<typeof authSchema>;
