"use server";

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finisReason: string;
  }>
}

export async function generateImage(data: FormData) {
  const prompt = data.get("prompt");
  const negative = data.get("negative");
  const steps = Number(data.get("steps"));
  const seed = Number(data.get("seed"));

  if (!prompt) throw new Error("El campo prompt es requerido");

  const apiEngine = "stable-diffusion-xl-1024-v1-0";
  const apiHost = "https://api.stability.ai";
  const apiKey = process.env.STABILITY_API_KEY;
  const endpoint = `${apiHost}/v1/generation/${apiEngine}/text-to-image`;

  const params = {
    text_prompts: [
      { text: prompt, weight: 1},
      { text: negative === "" ? "Blurred, deformed" : negative, weight: -1 }
    ],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    seed: seed,
    steps: steps,
    samples: 1,
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
  });

  try {
    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
  
    const responseJSON = (await response.json()) as GenerationResponse;
  
    const base64 = responseJSON.artifacts[0].base64;
    const url = `data:image/png;base64,${base64}`;

    return url;

  } catch (error) {
    console.error("Error:", error);
    throw error
  }
}
