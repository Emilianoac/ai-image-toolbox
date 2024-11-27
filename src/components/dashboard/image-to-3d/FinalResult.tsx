"use client";

import dynamic from "next/dynamic";
import { useState} from "react";
import Image from "next/image";
import { FaLightbulb, FaDownload, FaArrowLeft } from "react-icons/fa";
import AppDropdown from "@/components/globals/AppDropdown/AppDropdown";
import { lights } from "@/constants/image-to-3d";

const DynamicModelViewer = dynamic(() => import("@/components/globals/AppModelviewer"), { ssr: false });

interface Result3DProps {
  result: string;
  originalImage: string;
  reset: () => void;
}

export default function Result3D({ result, originalImage, reset }: Result3DProps) {
  const [currentLight, setCurrentLight] = useState(0);

  return (
    <>
      <div className="grid grid-cols-[700px_1fr] gap-8 p-4 mx-auto max-w-full">
        <div className="grid grid-cols-2 gap-4">
          {/* Original */}
          <div>
            <p className="text-sm font-bold mb-2">Original</p>
            <Image
              src={originalImage}
              width={350}
              height={350}
              alt="Imagen Original"
              className="w-[350px] h-[350px] mx-auto rounded-md max-w-full object-cover"
            />
          </div>
          
          {/* Modelo 3D */}
          <div className="flex items-start gap-2">
            <div>
              <p className="text-sm font-bold mb-2">Modelo 3D</p>
              <DynamicModelViewer
                src={result}
                alt="A 3D model"
                environment-image={lights[currentLight].file}
                camera-orbit="180deg 75deg 6m"
                camera-controls
                className="w-[350px] h-[350px] mx-auto rounded-md max-full"
                style={{
                  background: "radial-gradient(rgb(76, 71, 71), #212121, rgb(0, 0, 0))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div>
          <ul className="flex flex-col gap-2">
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
                href={result}
                download={`3d-model.glb`}
                className="action-button">
                  <FaDownload/>
              </a> 
            </li>
            <li>
              <AppDropdown
                items={lights.map((light) => light.name)}
                title="Luces"
                currentItem={currentLight}
                selecItem={setCurrentLight}>
                  <FaLightbulb/>
              </AppDropdown>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

