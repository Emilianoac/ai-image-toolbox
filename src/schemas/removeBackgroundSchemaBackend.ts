import z from "zod";
import sharp from "sharp";
import { checkFileSize, checkFileType } from "./utils/index";

async function checkImageSize(file: Blob ){
  const maxWidth = 300;
  const maxHeight = 300;
  
  try {
    const buffer = await file.arrayBuffer();
    const metadata = await sharp(buffer).metadata();
    if (!metadata.width || !metadata.height) return false;
    return metadata.width >= maxWidth && metadata.height >= maxHeight;
  } catch (error) {
    console.error("Error processing image:", error);
    return false;
  }
}

export const removeBackgroundSchema = z.object({
  originalImage: z
    .instanceof(Blob, {message: "La imagen es requerida"})
    .refine((value) => checkFileType(value, ["webp", "png", "jpeg"]), { message: "Tipo de archivo inválido"})
    .refine((value) => checkImageSize(value), { message: "La imagen debe ser de al menos de 300 x 300 Pixeles"})
    .refine((value) => checkFileSize(value, 2), { message: "El peso de la imagen debe ser menor a 2MB" }),
});

export type RemoveBackgroundSchema = z.infer<typeof removeBackgroundSchema>;
export type RemoveBackgroundErrorSchema = z.ZodFormattedError<RemoveBackgroundSchema>;