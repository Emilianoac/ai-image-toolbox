import ImageComparison from "./ImageComparison";
import { useAppStore } from "@/providers/app-state-provider";

export default function ImageResult() {

  const { removeBackgroundState } = useAppStore((state => state));

  return (
    <>
      <ImageComparison  
        originalImage={removeBackgroundState.originalImage}
        resultImage={removeBackgroundState.result}
        width={removeBackgroundState.imageDimensions.width}
        height={removeBackgroundState.imageDimensions.height}
      />
    </>
  );
}
