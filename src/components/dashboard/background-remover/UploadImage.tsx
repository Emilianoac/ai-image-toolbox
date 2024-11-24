"use client";

import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { examplesImages } from "@/constants/background-remover";
import Styles from "./UploadImage.module.css";
import ImageComparison from "./ImageComparison";

interface UploadImageProps {
  setUserImage: (image: string) => void;
}

export default function UploadImage({ setUserImage }: UploadImageProps) {

  function handleImageSelection (event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const image = event.target.files[0];
    const image_src = URL.createObjectURL(image);
    setUserImage(image_src);
  }

  async function loadExampleImage(image: string) {  
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], "example-image.webp", { type: "image/webp" });
    const image_src = URL.createObjectURL(file);
    setUserImage(image_src);
  }

  return (

    <div className={`${Styles['upload-image-container']}`}>
      <h1 className="text-xl md:text-2xl font-bold mb-8">Elimina el fondo de tus imagenes en segundos</h1>

      <ImageComparison/>

      <label className={`${Styles['upload-image-label']}`} htmlFor="user_image">
        Añadir una imagen <FaUpload className="inline-block ml-2" />
      </label>
      <input 
        type="file" 
        name="user_image" 
        id="user_image"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelection}
      />

      <span className="text-sm mb-3 block">¿Sin imagenes? prueba con una de estas.</span>
      <div className="grid grid-cols-6 gap-2 max-w-[400px] mx-auto">
        {
          examplesImages.map((image, index) => (
            <Image
              className="rounded-md cursor-pointer hover:opacity-80"
              key={index}
              src={image.src}
              title={image.title}
              width={200}
              height={200}
              alt={image.title}
              onClick={() => loadExampleImage(image.src)}>
            </Image>
          ))
        }
      </div>
    </div>
  )
}
