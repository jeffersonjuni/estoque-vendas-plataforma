import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome do produto deve ter pelo menos 2 caracteres.")
    .max(100, "O nome do produto deve ter no máximo 100 caracteres."),

  description: z
  .string()
  .trim()
  .max(500, "A descrição deve ter no máximo 500 caracteres.")
  .optional()
  .or(z.literal(""))
  .transform((val) => (val === "" ? undefined : val)),

  sku: z
    .string()
    .trim()
    .max(50, "O SKU deve ter no máximo 50 caracteres.")
    .optional()
    .or(z.literal("")),

  category: z
    .string()
    .trim()
    .max(50, "A categoria deve ter no máximo 50 caracteres.")
    .optional()
    .or(z.literal("")),

  price: z.coerce
    .number()
    .positive("O preço deve ser maior que zero."),

  stock: z.coerce
    .number()
    .int("O estoque deve ser um número inteiro.")
    .min(0, "O estoque não pode ser negativo.")
    .optional(),
});

export const updateProductSchema = createProductSchema.partial();