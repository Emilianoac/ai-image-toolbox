"use client";

import { useEffect } from "react";
import Image from "next/image";
import { removeBackground } from "@imgly/background-removal";
import { FaUpload } from "react-icons/fa";
import { examplesImages } from "@/constants/background-remover";
import Styles from "./UploadImage.module.css";
import ImageComparison from "../image-comparison/ImageComparison";
import { useAppStore } from "@/providers/app-state-provider";
import AppLoader from "@/components/globals/AppLoader/AppLoader";

export default function UploadImage() {

  const {
    removeBackgroundState, 
    updateRBOriginalImage, 
    upadteRBResult, 
    updateRBLoading,
    updateRBImageDimensions
  } = useAppStore((state => state));

  async function handleImageSelection (event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    updateRBLoading(true);

    const image = event.target.files[0];
    const image_src = URL.createObjectURL(image);
    updateRBOriginalImage(image_src);

    const result = await removeBackground(image_src);
    const url = URL.createObjectURL(result);
    upadteRBResult(url);

    updateRBLoading(false);
  }

  async function loadExampleImage(image: string) {  

    updateRBLoading(true);

    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], "example-image.webp", { type: "image/webp" });
    const image_src = URL.createObjectURL(file);
    updateRBOriginalImage(image_src);

    const result = await removeBackground(image_src);
    const url = URL.createObjectURL(result);
    upadteRBResult(url);

    updateRBLoading(false);
  }

  useEffect(() => {
    function calculateAspectRatio() {
      if (!removeBackgroundState.originalImage) return;

      const img = new window.Image();
      img.src = removeBackgroundState.originalImage;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const aspectRatio = imgWidth / imgHeight;
        
        let newWidth, newHeight;
    
        if (imgHeight > 450) {
          newHeight = 450;
          newWidth = newHeight * aspectRatio;

        } else {
          newWidth = 450;
          newHeight = newWidth / aspectRatio;
        }

        updateRBImageDimensions({ width: newWidth, height: newHeight });
      };
    }
    calculateAspectRatio();
  }, [removeBackgroundState.originalImage, updateRBImageDimensions]);

  return (
    <>
      { !removeBackgroundState.loading &&
        <div className={`${Styles['upload-image-container']} app-card`}>
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
      }

      {
        removeBackgroundState.loading && removeBackgroundState.originalImage &&
        <div className={`${Styles['result-container']}`}>
          <div className={`${Styles['result-loading']}`}>
            <Image 
              src={removeBackgroundState.originalImage} 
              width={removeBackgroundState.imageDimensions.width}
              height={removeBackgroundState.imageDimensions.height} 
              alt="Imagen original"
            />
            <AppLoader text="Eliminando el fondo..." includeBackground={false} />
          </div>
        </div>
      }
    </>
  )
}
