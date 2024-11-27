import { useState, useEffect } from "react";
import Styles from  "./ImageResult.module.css";
import Image from "next/image";
import ImageComparison from "./ImageComparison";

interface ImageComparisonProps {
  imageWithBg: string;
  imageWithoutBg: string;
}

export default function ImageResult({ imageWithBg, imageWithoutBg }: ImageComparisonProps) {
  const [newWidth, setNewWidth] = useState<null | number>(null);
  const [newHeight, setNewHeight] = useState<null | number>(null);

  useEffect(() => {

    function calculateAspectRatio() {
      const img = new window.Image();
      img.src = imageWithBg;
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
    
        setNewWidth(newWidth);
        setNewHeight(newHeight);
      };
    }

    calculateAspectRatio();
  }, [imageWithBg]);

  
  return (
    <div className={`${Styles['result-container']}`}>
      { !imageWithoutBg ?
        <>
          { newWidth && newHeight &&
          <div className={`${Styles['result-loading']}`}>
            <Image src={imageWithBg} width={newWidth} height={newHeight} alt="Imagen original"/>
            <p className={`${Styles['loading-text']}`}> Eliminando el fondo...</p>
          </div>

          }
        </>
        :
        <ImageComparison  
          originalImage={imageWithBg}
          resultImage={imageWithoutBg}
          width={newWidth ? newWidth : 400}
          height={newHeight ? newHeight : 400}
        />
      }
    </div>
  );
};
