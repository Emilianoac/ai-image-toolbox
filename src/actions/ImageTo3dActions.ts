"use server";

export async function imageTo3d(data: FormData) {

  try {
    const image = data.get("image");
  
    if (!image) throw new Error("El campo image es requerido");
    if (!(image instanceof Blob)) throw new Error("El campo image debe ser un archivo");
  
    const apiKey = process.env.STABILITY_API_KEY;
    const endpoint = "https://api.stability.ai/v2beta/3d/stable-fast-3d";
  
    const formData = new FormData();
    formData.append("image", image); 

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
