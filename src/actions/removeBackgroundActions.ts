"use server";

import { originalImageSchema } from "@/schemas/originalImageSchemaBackend";


export async function removeBackground(data: FormData) {

  const originalImage = data.get("image") as File;

  const validatedParams =  await originalImageSchema.safeParseAsync({ originalImage });
  if (!validatedParams.success) {
    const messages: string[] = [];
    validatedParams.error.errors.map((error) => {
      messages.push(error.message);
    });
    
    return { error: true, validationMessages: messages };
  }


  const apiKey = process.env.STABILITY_API_KEY;
  const endpoint = "https://api.stability.ai/v2beta/stable-image/edit/remove-background";
  
  try {
    const formData = new FormData();
    formData.append("image", originalImage); 
    formData.append("output_format", "webp");

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { 
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "image/*",
      },
    });
  
    if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);

    const result = await response.arrayBuffer();
    const buffer = Buffer.from(result).toString("base64");
    const url = `data:image/webp;base64,${buffer}`;
  
    return url;
    
  } catch {
    return {
      error: true,
      message : "Error al procesar la imagen",
    }
  }
}