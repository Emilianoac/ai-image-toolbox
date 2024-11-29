"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { examplesImages } from "@/constants/background-remover";
import Styles from "./UploadImage.module.css";
import ImageComparison from "../image-comparison/ImageComparison";
import { useAppStore } from "@/providers/app-state-provider";
import AppLoader from "@/components/globals/AppLoader/AppLoader";
import { removeBackground } from "@/actions/removeBackgroundActions";
import { originalImageSchema, OriginalImageSchema, OriginalImageErrorSchema } from "@/schemas/originalImageScehma";

export default function UploadImage() {
  const [formErrors, setFormErrors] = useState<OriginalImageErrorSchema | undefined>(undefined);

  const {
    removeBackgroundState, 
    updateRBOriginalImage, 
    upadteRBResult, 
    updateRBLoading,
    updateRBImageDimensions
  } = useAppStore(state => state);

  async function loadImage(image: File | string) {  
    let file: File;
    let originalimage: string;
  
    try {
      if (typeof image === "string") {
        const response = await fetch(image);
        const blob = await response.blob();
        file = new File([blob], "example-image.webp", { type: "image/webp" });
        originalimage = URL.createObjectURL(file);
      } else {
        const validate = await validateData({ originalImage: image });
        if (!validate) {
          updateRBLoading(false);
          return; 
        }
        originalimage = URL.createObjectURL(image);
        file = image;
      }

      updateRBLoading(true);
      updateRBOriginalImage(originalimage);
  
      const data = new FormData();
      data.append("image", file);
      const result = await removeBackground(data);
  
      if (!result || typeof result !== "string") throw new Error("No se pudo eliminar el fondo de la imagen");
  
      upadteRBResult(result);
    } catch (error) {
      console.error(error);
      upadteRBResult(undefined);
      updateRBLoading(false);
    } finally {
      updateRBLoading(false);
    }
  }
  

  function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const image = event.target.files[0];
    loadImage(image);
  }

  async function validateData(data: OriginalImageSchema) {
    const result = await originalImageSchema.safeParseAsync(data);

    if (!result.success) {
      setFormErrors(result.error.format());
      return false;
    } else {
      setFormErrors(undefined);
      return true;
    }
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
      {!removeBackgroundState.loading && (
        <div className={`${Styles["upload-image-container"]} app-card`}>
          {
            formErrors?.originalImage?._errors.map((error, index) => (
              <p className="text-red-500 text-sm mb-2" key={index}>- {error}</p>
            ))
          }
          <h1 className="text-xl md:text-2xl font-bold mb-8">
            Elimina el fondo de tus imagenes en segundos
          </h1>

          <ImageComparison />

          <label
            className={`${Styles["upload-image-label"]} mt-10`}
            htmlFor="user_image"
          >
            Añadir una imagen <FaUpload className="inline-block ml-2" />
          </label>
          <input
            type="file"
            name="user_image"
            id="user_image"
            accept="image/webp, image/png, image/jpeg"
            className="hidden"
            onChange={handleImageSelection}
          />
          <p className="opacity-60 mb-10 mt-2 text-xs">
            Tamaño minimo: 300 x 300 Pixeles, Peso maximo: 2MB
          </p>

          <span className="text-sm mb-3 block">¿Sin imagenes? prueba con una de estas.</span>
          <div className="grid grid-cols-6 gap-2 max-w-[400px] mx-auto">
            {examplesImages.map((image, index) => (
              <Image
                className="rounded-md cursor-pointer hover:opacity-80"
                key={index}
                src={image.src}
                title={image.title}
                width={200}
                height={200}
                alt={image.title}
                onClick={() => loadImage(image.src)}
              />
            ))}
          </div>
        </div>
      )}

      {removeBackgroundState.loading && removeBackgroundState.originalImage && (
        <div className={`${Styles["result-container"]}`}>
          <div className={`${Styles["result-loading"]}`}>
            <Image
              src={removeBackgroundState.originalImage}
              width={removeBackgroundState.imageDimensions.width}
              height={removeBackgroundState.imageDimensions.height}
              alt="Imagen original"
            />
            <AppLoader text="Eliminando el fondo..." includeBackground={false} />
          </div>
        </div>
      )}
    </>
  );
}
