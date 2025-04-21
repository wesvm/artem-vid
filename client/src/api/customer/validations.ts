import z from "zod";

export const customerSchema = z
  .object({
    documentType: z.enum(["RUC", "DNI"], {
      required_error: "El tipo de documento es obligatorio",
    }),
    documentNumber: z
      .string()
      .trim()
      .min(1, "El número de documento es obligatorio")
      .max(20),
    name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
    tradeName: z.string().max(255).optional(),
    address: z.string().optional(),
    department: z.string().max(50).optional(),
    province: z.string().max(50).optional(),
    district: z.string().max(50).optional(),
    phone: z.string().max(20).optional(),
    email: z.string().email().max(100).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.documentType === "DNI") {
        return /^\d{8}$/.test(data.documentNumber);
      }
      if (data.documentType === "RUC") {
        return /^\d{11}$/.test(data.documentNumber);
      }
      return false;
    },
    {
      path: ["documentNumber"],
      message: "Número de documento inválido para el tipo seleccionado",
    }
  );

export type CustomerSchema = z.infer<typeof customerSchema>;
