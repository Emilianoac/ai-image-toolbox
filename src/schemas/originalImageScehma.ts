import z from "zod";
import { checkFileSize, checkFileType } from "./utils/index";

async function checkImageSize(file: Blob ){
  const maxWidth = 300;
  const maxHeight = 300;

  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const isValid = img.width >= maxWidth && maxHeight >= 300;
      URL.revokeObjectURL(img.src); 
      resolve(isValid);
    };
  });
}

export const originalImageSchema = z.object({
  originalImage: z
    .instanceof(Blob,{ message: "La imagen es requerida" })
    .refine((value) => checkFileType(value, ["webp", "png", "jpeg"]), { message: "Tipo de archivo inválido"})
    .refine((value) => checkImageSize(value), { message: "La imagen debe ser de al menos de 300 x 300 Pixeles"})
    .refine((value) => checkFileSize(value, 2), { message: "El peso de la imagen debe ser menor a 2MB" }),
});


export type OriginalImageSchema = z.infer<typeof originalImageSchema>;
export type OriginalImageErrorSchema = z.ZodFormattedError<OriginalImageSchema>;