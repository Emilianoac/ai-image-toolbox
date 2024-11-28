"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FaLightbulb, FaDownload, FaArrowLeft } from "react-icons/fa";
import AppDropdown from "@/components/globals/AppDropdown/AppDropdown";
import { lights } from "@/constants/image-to-3d";
import { useAppStore } from "@/providers/app-state-provider";

const DynamicModelViewer = dynamic(() => import("@/components/globals/AppModelviewer"), { ssr: false });

export default function Result3D() {
  const { 
    imageTo3dState, 
    update3dResult, 
    updateCurrentLight,
    updateOriginalImage 
  } = useAppStore((state) => state);

  const originalImage = imageTo3dState.originalImage ? URL.createObjectURL(imageTo3dState.originalImage) : "";

  function reset() {
    updateOriginalImage(undefined);
    update3dResult(undefined);
  }
  return (
    <>
      <div className="block lg:grid grid-cols-[700px_1fr] gap-8 p-4 mx-auto max-w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {/* Original */}
          <div>
            <p className="text-sm font-bold mb-2">Original</p>
            <Image
              src={originalImage}
              width={350}
              height={350}
              alt="Imagen Original"
              className="w-[290px] h-auto lg:w-[350px] lg:h-[350px] mx-auto rounded-md max-w-full object-cover"
            />
          </div>
          
          {/* Modelo 3D */}
          {imageTo3dState.result &&
            <div className="flex items-start gap-2">
              <div className="w-full">
                <p className="text-sm font-bold mb-2">Modelo 3D</p>
                <DynamicModelViewer
                  src={imageTo3dState.result}
                  alt="A 3D model"
                  environment-image={lights[imageTo3dState.currentLight].file}
                  camera-orbit="180deg 75deg 6m"
                  camera-controls
                  className="w-[290px] h-[290px] lg:w-[350px] lg:h-[350px] mx-auto rounded-md max-full"
                  style={{
                    background: "radial-gradient(rgb(76, 71, 71), #212121, rgb(0, 0, 0))",
                  }}
                />
              </div>
            </div>
          }
        </div>

        {/* Acciones */}
        <div className="mt-4 lg-mt-0">
          <ul className="flex flex-row lg:flex-col gap-2">
            <li>
              <button
                title="Generar otro modelo"
                onClick={reset}
                className="action-button">
                  <FaArrowLeft/>
              </button>
            </li>
            <li>
              <a
                title="Descargar Modelo 3D"
                href={imageTo3dState.result}
                download={`3d-model.glb`}
                className="action-button">
                  <FaDownload/>
              </a> 
            </li>
            <li>
              <AppDropdown
                items={lights.map((light) => light.name)}
                title="Luces"
                currentItem={imageTo3dState.currentLight}
                selecItem={updateCurrentLight}>
                  <FaLightbulb/>
              </AppDropdown>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

