"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import {lights, examples} from "@/constants/image-to-3d";
import { imageTo3d } from "@/actions/ImageTo3dActions";
import Styles from "./ImageTo3dClient.module.css";
import { FaUpload } from "react-icons/fa";

const DynamicModelViewer = dynamic(() => import("@/components/globals/AppModelviewer"), { ssr: false });


interface AddImageProps {
  setSelectedImage: (file: File) => void;
  setResult: (data: string) => void;
  setLoading: (loading: boolean) => void;
}

function AddImage({setSelectedImage, setResult, setLoading}: AddImageProps) {
  const [currentExample, setCurrentExample] = useState(0);

  async function handle3dGeneration( event: React.ChangeEvent<HTMLInputElement> ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const data = await imageTo3d(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${Styles["add-image-container"]} app-card`}>

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

        <label
          className={`${Styles["add-image-label"]}`}
          htmlFor="user-image"
        >
          Añadir una imagen <FaUpload className="ms-2" />
        </label>
        <input
          id="user-image"
          type="file"
          hidden
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
  );
}

export default AddImage;
