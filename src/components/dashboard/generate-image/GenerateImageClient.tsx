"use client";

import Image from "next/image";
import { useState } from "react";
import { FaWandMagicSparkles, FaDownload } from "react-icons/fa6";
import { generateImage } from "@/actions/generateImageActions";
import AppLoader from "@/components/globals/AppLoader/AppLoader";
import { useAppStore } from "@/providers/app-state-provider";
import { generateImageSchema, GenerateImageSchema, GenerateImageErrorSchema } from "@/schemas/generateImageSchema";

export default function GenerateImageClient() {

  const { 
    updateResult, 
    updateFormData, 
    updateLoading, 
    generateImageState
  } = useAppStore((state) => state);

  const formData = generateImageState.formData;
  const [formError, setFormError] = useState<GenerateImageErrorSchema | undefined>(undefined);
  const [error, setError] = useState({ messages: [] as string[], show: false });

  async function handeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateFormData(formData)) return;
    
    updateLoading(true);
    setError({ messages: [], show: false });

    const data = createFormData();
    try {
      const res = await generateImage(data);
      const imageUrl = validateResponse(res);

      updateResult(imageUrl);

    } catch (error) {
      handleSetError(error);
    } finally {
      updateLoading(false);
    }
  };

  function createFormData() {
    const data = new FormData();
    data.append("prompt", formData.prompt);
    data.append("negative", formData.negative);
    data.append("steps", formData.steps.toString());
    data.append("seed", formData.seed.toString());
    return data;
  };

  function handeFormData(key: string, value: string | number) {
    updateFormData({ ...formData, [key]: value });
  };

  function validateFormData(data: GenerateImageSchema) {
    const validSchema = generateImageSchema.safeParse(data);

    if (!validSchema.success)  {
      setFormError(validSchema.error.format());
      return false;
    } else {
      setFormError(undefined);
      return true;
    }
  };

  function validateResponse(res: any) {
    if (res.error && res.validationMessages) {
      throw new Error(res.validationMessages.join(", "), { cause: "validation" });
    }
    if (res.error && res.generalMessage) {
      throw new Error(res.generalMessage, { cause: "general" });
    }
    if (!res.url) {
      throw new Error("No se pudo obtener la imagen");
    }
    return res.url;
  }

  function handleSetError(error: unknown) {
    let message = "Error inesperado al procesar la solicitud";
    let cause = "general";
  
    if (error instanceof Error) {
      message = error.message;
      cause = typeof error.cause === "string" ? error.cause : "general";
    }
  
    const messagesArray =
      cause === "validation" ? message.split(", ") : ["Error al generar la imagen"];
    
    setError({ messages: messagesArray, show: true });
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[_400px_1fr] gap-3 w-full h-full relative">
      <form 
        onSubmit={handeSubmit}
        className="app-card max-w-[450px] w-full mx-auto order-1 lg:order-first h-fit">
        <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Generar nueva imagen
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
            onChange={(e) => handeFormData("prompt", e.target.value)}
          >
          </textarea>
          {formError?.prompt &&
            formError.prompt._errors.map((error, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
            ))
          }
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
            onChange={(e) => handeFormData("negative", e.target.value)}
          >
          </textarea>
          {formError?.negative &&
            formError.negative._errors.map((error, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
            ))
          }
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
            onChange={(e) => handeFormData("steps", parseInt(e.target.value))}
          />
          <div className="flex w-full justify-between mt-2 text-xs">
            <span>10</span>
            <span>30</span>
          </div>
          {formError?.steps &&
            formError.steps._errors.map((error, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
            ))
          }
        </div>

        {/* Seed */}
        <div className="mt-4">
          <label className="block text-sm mb-3" htmlFor="seed">Seed</label>
          <input 
            type="number" 
            id="seed" 
            name="seed"
            defaultValue={formData.seed}
            onChange={(e) => handeFormData("seed", parseInt(e.target.value))}
          />
          {formError?.seed &&
            formError.seed._errors.map((error, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
            ))
          }
        </div>

        <button 
          disabled={generateImageState.loading}
          className="
            bg-app-primary text-white 
            py-2 px-4 rounded-md mt-3 
            w-full 
            font-semibold 
            disabled:opacity-50 
            disabled:cursor-not-allowed
            hover:opacity-90
          "
          type="submit">
            Generar Imagen
        </button>

        {error.show && 
          error.messages.map((message, index) => (
            <p key={index} className="text-red-500 text-xs mt-1">- {message}</p>
          ))
        }
      </form> 

      <div className="flex justify-center items-center">

        {!generateImageState.result && <p className="text-center opacity-40 font-semibold">Aún no se ha generado ninguna imagen</p>}

        { generateImageState.result && 
          <div className="flex gap-4 flex-col lg:flex-row">
            <Image 
              className="max-w-[500px] w-full h-auto rounded-md mx-auto"
              src={ generateImageState.result} 
              alt="Imagen generada"
              width={500}
              height={500}
            />
            <ul>
              <li>
                <a 
                  href={ generateImageState.result} 
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

      { generateImageState.loading && 
        <AppLoader 
          className="!fixed"
          text="Generando Imagen..."
        />
      }

    </div>
  )
}
