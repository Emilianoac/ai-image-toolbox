"use server";

import { originalImageSchema } from "@/schemas/originalImageSchemaBackend";

export async function imageTo3d(data: FormData) {

  const originalImage = data.get("image") as File;

  const validatedParams =  await originalImageSchema.safeParseAsync({ originalImage });
  if (!validatedParams.success) {
    const messages: string[] = [];
    validatedParams.error.errors.map((error) => {
      messages.push(error.message);
    });
    
    return { error: true, validationMessages: messages };
  }

  try {
    const apiKey = process.env.STABILITY_API_KEY;
    const endpoint = "https://api.stability.ai/v2beta/3d/stable-fast-3d";
  
    const formData = new FormData();
    formData.append("image", originalImage); 

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { "Authorization": `Bearer ${apiKey}` },
    });
  
    if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);

    const result = await response.arrayBuffer();
    const buffer = Buffer.from(result).toString('base64');
    const url = `data:application/octet-stream;base64,${buffer}`;
  
    return { url };

  } catch(error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : "Error desconocido"
    }
  }
}
