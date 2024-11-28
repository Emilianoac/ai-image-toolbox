"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import {lights, examples} from "@/constants/image-to-3d";
import { imageTo3d } from "@/actions/ImageTo3dActions";
import Styles from "./ImageTo3dClient.module.css";
import { FaUpload } from "react-icons/fa";
import AppLoader from "@/components/globals/AppLoader/AppLoader";
import { useAppStore } from "@/providers/app-state-provider";

const DynamicModelViewer = dynamic(() => import("@/components/globals/AppModelviewer"), { ssr: false });

export default function AddImage() {

  const { 
    update3dResult, 
    updateOriginalImage, 
    update3dLoading, 
    imageTo3dState 
  } = useAppStore((state) => state);

  const [currentExample, setCurrentExample] = useState(0);
  const [error, setError] = useState({ error: false, message: ""});

  async function handle3dGeneration( event: React.ChangeEvent<HTMLInputElement> ) {
    setError({ error: false, message: "" });

    const file = event.target.files?.[0];
    if (!file) {
      setError({ error: true, message: "No se ha seleccionado una imagen" });
      return;
    }

    updateOriginalImage(file);
    updateOriginalImage(file);
    update3dLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const data = await imageTo3d(formData);

      if (data.error) throw new Error(data.message);
      if (!data.url) throw new Error("No se pudo obtener el modelo 3D");

      update3dResult(data.url);
    } catch (error) {
      setError({
        error: true,
        message: error instanceof Error ? error.message : "Error al generar el modelo 3D"
      })
    } finally {
      update3dLoading(false);
    }
  }

  return (
    <>
      {!imageTo3dState.loading &&
        <div className={`${Styles["add-image-container"]} app-card`}>

          {error.error && <p className="text-red-500 text-sm mb-2">{error.message}</p>}

          <div>
            <h1 className="font-bold text-xl lg:text-2xl mb-4">
              Crea un modelo 3D a partir de una imagen 2D
            </h1>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 mt-10">
              <Image
                src={examples[currentExample].image}
                width={200}
                height={200}
                alt="Imagen Original"
                className="w-[200px] h-[200px] mx-auto rounded-md"
              />
              <DynamicModelViewer
                src={examples[currentExample].glb}
                alt="A 3D model"
                environment-image={lights[3].file}
                camera-orbit="180deg 75deg 6m"
                camera-controls
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  maxWidth: "100%",
                  height: "200px",
                  background:
                    "radial-gradient(rgb(76, 71, 71), #212121, rgb(0, 0, 0))",
                }}
              />
            </div>

            <label className={`${Styles["add-image-label"]}`} htmlFor="user-image">
              Añadir una imagen <FaUpload className="ms-2"/>
            </label>
            <input
              id="user-image"
              type="file"
              accept="image/*"
              hidden
              multiple={false}
              onChange={(e) => handle3dGeneration(e)}
            />

            <p className="text-center text-sm mb-2">Ejemplos</p>
            <ul className="grid grid-cols-4 gap-4 max-w-[300px] mx-auto">
              {examples.map((example, index) => (
                <li
                  className="cursor-pointer"
                  onClick={() => setCurrentExample(index)}
                  key={index}
                >
                  <Image
                    width={100}
                    height={100}
                    src={example.image}
                    alt={example.name}
                    className="rounded-md w-full hover:opacity-80"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div> 
      }

      {imageTo3dState.loading && <WaitingResult selectedImage={imageTo3dState.originalImage} />}
    </>
  );
}

interface WaitingResultProps {
  selectedImage?: File | null;
}

function WaitingResult({ selectedImage }: WaitingResultProps) {
  return (
    <div className="w-fit relative rounded-md overflow-hidden mx-auto">
      <Image
        src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
        width={400}
        height={400}
        alt="Imagen Original"
        className="w-[400px] aspect-square object-cover"
      />
      <AppLoader text="Generando modelo 3D..." />
    </div>
  )
}