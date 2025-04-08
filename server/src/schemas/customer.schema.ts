import z from "zod"

export const customerSchema = z.object({
  id: z.string().uuid(),
  documentType: z.enum(["RUC", "DNI"]),
  documentNumber: z.string().max(20),
  name: z.string().max(100),
  tradeName: z.string().max(255).optional(),
  address: z.string().optional(),
  department: z.string().max(50).optional(),
  province: z.string().max(50).optional(),
  district: z.string().max(50).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().max(100).email().optional(),
})

export const customerCreateSchema = customerSchema.omit({ id: true })
  .refine((data) => {
    if (data.documentType === "DNI") {
      return /^\d{8}$/.test(data.documentNumber);
    }
    if (data.documentType === "RUC") {
      return /^\d{11}$/.test(data.documentNumber);
    }
    return false;
  }, {
    path: ["documentNumber"],
    message: "Número de documento inválido para el tipo seleccionado",
  });;

export type CustomerSchema = z.infer<typeof customerSchema>;
export type CustomerCreateSchema = z.infer<typeof customerCreateSchema>;