"use client";

import Image from "next/image";
import { useState } from "react";
import { FaWandMagicSparkles, FaDownload } from "react-icons/fa6";
import { generateImage } from "@/actions/generateImageActions";
import AppLoader from "@/components/globals/AppLoader/AppLoader";

export default function GenerateImageClient() {
  const [formData, SetFormData] = useState({
    prompt: "",
    negative: "",
    steps: 10,
    seed: 0,
  });
  const [image, setImage] = useState("");
  const [error, setError] = useState({
    message: "",
    show: false,
  });
  const [loading, setLoading] = useState(false);

  async function handeSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!formData.prompt || loading) return;

    setImage("");
    setError({ message: "", show: false });
    setLoading(true);
    event.preventDefault();

    const data = new FormData();
    data.append("prompt", formData.prompt);
    data.append("negative", formData.negative);
    data.append("steps", formData.steps.toString());
    data.append("seed", formData.seed.toString());

    try {
      const res = await generateImage(data);
      setImage(res);

    } catch (error) {
      console.error("Error:", error);
      setError({
        message: error instanceof Error ? error.message : "An error occurred",
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };

  function setFormData(key: string, value: string | number) {
    SetFormData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[_400px_1fr] gap-3 w-full h-full">
      <form 
        onSubmit={handeSubmit}
        className="app-card max-w-[450px] w-full mx-auto order-1 lg:order-first">
        <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Crear nueva imagen
          <FaWandMagicSparkles/>
        </h1>

        {/* Prompt */}
        <div>
          <label className="block text-sm mb-3" htmlFor="prompt">Prompt</label>
          <textarea 
            className="min-h-[70px] max-h-[100px] overflow-y-auto" 
            id="prompt" 
            name="prompt"
            placeholder="Escribe tu prompt aquí"
            value={formData.prompt}
            onChange={(e) => setFormData("prompt", e.target.value)}
          >
          </textarea>
        </div>

        {/* Negative Prompt */}
        <div className="mt-4">
          <label className="block text-sm mb-3" htmlFor="negative">Negative Prompt</label>
          <textarea 
            className="min-h-[70px] max-h-[100px] overflow-y-auto" 
            id="negative" 
            name="negative"
            placeholder="Escribe tu negative prompt aquí"
            value={formData.negative}
            onChange={(e) => setFormData("negative", e.target.value)}
          >
          </textarea>
        </div>

        {/* Steps */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm" htmlFor="steps">Steps</label>
            <span className="text-xs">{formData.steps} steps</span>
          </div>
          <input 
            type="range" 
            id="steps" 
            name="steps"
            min="10" 
            max="30" 
            step="1"
            defaultValue={formData.steps}
            onChange={(e) => setFormData("steps", parseInt(e.target.value))}
          />
          <div className="flex w-full justify-between mt-2 text-xs">
            <span>10</span>
            <span>30</span>
          </div>
        </div>

        {/* Seed */}
        <div className="mt-4">
          <label className="block text-sm mb-3" htmlFor="seed">Seed</label>
          <input 
            type="number" 
            id="seed" 
            name="seed"
            defaultValue={formData.seed}
            onChange={(e) => setFormData("seed", parseInt(e.target.value))}
          />
        </div>

        <button 
          className="bg-app-primary text-white py-2 px-4 rounded-md mt-3 w-full font-semibold"
          type="submit">
            Generar Imagen
        </button>

        {error.show && <p className="text-sm text-center mt-3 text-red-500">{error.message}</p>}
      </form> 

      <div className="flex justify-center items-center relative min-h-[100px]">

        {loading && <AppLoader includeBackground={false} text="Generando Imagen..."/>}

        { image && 
        <div className="flex gap-4 flex-col lg:flex-row">
          <Image 
            className="max-w-[500px] w-full h-auto rounded-md mx-auto"
            src={image} 
            alt="Imagen generada"
            width={500}
            height={500}
          />
          <ul>
            <li>
              <a 
                href={image} 
                title="Descargar imagen"
                download={`result-${new Date().getTime()}.png`}
                className="action-button">
                  <FaDownload/>
              </a>
            </li>
          </ul>
        </div>
        }
      </div> 
    </div>
  )
}
