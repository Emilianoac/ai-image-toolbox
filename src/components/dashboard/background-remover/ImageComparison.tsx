import { useState, useEffect } from "react";
import Styles from "./ImageComparison.module.css";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";

const sampleOriginalImage = "/images/examples/background-remover/maneki-neko.webp";
const sampleResultImage = "/images/examples/background-remover/no-bg-image.png";

interface ImageComparisonProps {
  originalImage?: string,
  resultImage?: string,
  width?: number,
  height?: number
}

export default function ImageComparison({
  originalImage = sampleOriginalImage, 
  resultImage = sampleResultImage, 
  width = 200, 
  height = 200
}: ImageComparisonProps) {
  const [sliderValue, setSliderValue] = useState(100);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  useEffect(() => {
    if (imagesLoaded < 2) return;

    const interval = setInterval(() => {
      setSliderValue((prevValue) => {
        if (prevValue > 0) {
          return prevValue - 2;
        } else {
          clearInterval(interval);
          return prevValue;
        }
      });
    }, 10);
    
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${Styles['image-comparison-container']}`}>
        <Image
          alt="Original"
          width={width}
          height={width}
          src={originalImage}
          onLoadingComplete={handleImageLoad}
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        />
        <Image 
          width={height}
          height={height}
          alt="Resultado"
          src={resultImage}
          onLoadingComplete={handleImageLoad}
          className={`${Styles['image-comparison__result']}`}
        />
      </div>

      <div className="flex items-center gap-2 mt-2 p-1">
        <span className="text-sm">
          <FaMinus />
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <span className="text-sm">
          <FaPlus />
        </span>
      </div>
    </div>
  );
}
