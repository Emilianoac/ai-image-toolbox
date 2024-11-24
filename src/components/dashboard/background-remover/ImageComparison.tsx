import { useState, useEffect} from "react";
import Styles from "./ImageComparison.module.css";
import Image from "next/image";

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
}: ImageComparisonProps
) {
  const [sliderValue, setSliderValue] = useState(100);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  useEffect(() => {
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
  }, []); 

  return (
    <div className="flex flex-col items-center">
      <div className={`${Styles['image-comparison-container']}`}>
        <Image
          alt="Original"
          width={width}
          height={width}
          src={originalImage}
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        />
        <Image 
          width={height}
          height={height}
          alt="resultado"
          src={resultImage} 
          className={`${Styles['image-comparison__result']}`}
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="mt-4"
      />
    </div>
  )
}
