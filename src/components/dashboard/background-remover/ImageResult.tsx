import { useState, useEffect } from "react";
import Styles from  "./ImageResult.module.css";
import Image from "next/image";

interface ImageComparisonProps {
  imageWithBg: string;
  imageWithoutBg: string;
}

export default function ImageComparison({ imageWithBg, imageWithoutBg }: ImageComparisonProps) {
  const [newWidth, setNewWidth] = useState(500);
  const [newHeight, setNewHeight] = useState(500);

  useEffect(() => {

    function calculateAspectRatio() {
      const img = new window.Image();
      img.src = imageWithBg;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const aspectRatio = imgWidth / imgHeight;
        const newWidth = 600;
        const newHeight = newWidth / aspectRatio;
        setNewWidth(newWidth);
        setNewHeight(newHeight);
      };
    }

    calculateAspectRatio();

  }, [imageWithBg]);

  return (
    <div className={`${Styles['result-container']}`}>
      { !imageWithoutBg ?
        <div className={`${Styles['result-loading']}`}>
          <Image src={imageWithBg} width={newWidth} height={newHeight} alt="Imagen original"/>
          <p className={`${Styles['loading-text']}`}> Eliminando el fondo...</p>
        </div>
        :
        <Image src={imageWithoutBg} width={newWidth} height={newHeight} alt="Resultado"/>
      }
    </div>
  );
};
