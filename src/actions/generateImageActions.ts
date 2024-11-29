"use server";

import { generateImageSchema } from "@/schemas/generateImageSchema";

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finisReason: string;
  }>
}

export async function generateImage(data: FormData) {
  
  const formData = {
    prompt: data.get("prompt"),
    negative: data.get("negative"),
    steps: Number(data.get("steps")),
    seed: Number(data.get("seed")),
  }

  const validatedParams = generateImageSchema.safeParse(formData);
  if (!validatedParams.success) {
    const messages: string[] = [];
    validatedParams.error.errors.map((error) => {
      messages.push(error.message);
    });
    
    return { error: true, validationMessages: messages };
  }

  const apiEngine = "stable-diffusion-xl-1024-v1-0";
  const apiHost = "https://api.stability.ai";
  const apiKey = process.env.STABILITY_API_KEY;
  const endpoint = `${apiHost}/v1/generation/${apiEngine}/text-to-image`;

  const params = {
    text_prompts: [
      { text: formData.prompt, weight: 1},
      { text: formData.negative === "" ? "Blurred, deformed" : formData.negative, weight: -1 }
    ],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    seed: formData.seed,
    steps: formData.steps,
    samples: 1,
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
  
    const responseJSON = (await response.json()) as GenerationResponse;
    const base64 = responseJSON.artifacts[0].base64;
    const url = `data:image/png;base64,${base64}`;

    return { url };

  } catch {    
    return {
      error: true,
      generalMessage: "Error al generar la imagen. Si el prompt es muy específico, intenta con uno más general.",
    }
  }
}
