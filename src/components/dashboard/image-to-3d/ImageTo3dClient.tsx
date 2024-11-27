"use client";

import { useState} from "react";
import AddImage from "./AddImage";
import FinalResult from "./FinalResult";

export default function ImageTo3dClient() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

  function reset() {
    setSelectedImage(null);
    setResult(null);
  }

  return (
    <>
      {!result && (
        <AddImage 
          setResult={setResult} 
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />
      )}

      {result && (
        <FinalResult 
          result={result} 
          originalImage={selectedImage ? URL.createObjectURL(selectedImage) : ""}
          reset={reset}
        />
      )}
    </>
  )
}
