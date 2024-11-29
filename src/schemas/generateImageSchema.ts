
import { z } from "zod";

export const generateImageSchema = z.object({
  prompt: z
    .string({
      message: "El prompt es requerido."
    })
    .min(1, { message: "El prompt es requerido." })
    .max(500, { message: "El prompt no puede tener más de 500 caracteres." }),
  negative: z
    .string()
    .max(500, { message: "El prompt negativo no puede tener más de 500 caracteres." })
    .optional(),
  seed: z
    .number({
      message: "El seed es requerido."
    })
    .int()
    .min(0, { message: "El seed debe ser mayor o igual a 0." })
    .max(4294967 , { message: "El seed debe ser menor o igual a 4294967." }),
  steps: z
    .number({
      message: "Steps es requerido."
    })
    .int({
      message: "Steps debe ser un número entero."
    })
    .min(10, { message: "Steps debe ser un número entre 10 y 30." })
    .max(30, { message: "Steps debe ser un número entre 10 y 30." }),
})

export type GenerateImageSchema = z.infer<typeof generateImageSchema>;
export type GenerateImageErrorSchema = z.ZodFormattedError<GenerateImageSchema>;

