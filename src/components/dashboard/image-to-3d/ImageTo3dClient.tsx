"use client";

import { useState} from "react";
import AddImage from "./AddImage";
import FinalResult from "./FinalResult";
import AppLoader from "@/components/globals/AppLoader/AppLoader";
import Image from "next/image";

export default function ImageTo3dClient() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function reset() {
    setSelectedImage(null);
    setResult(null);
  }

  return (
    <>
      {!result && !loading &&  (
        <AddImage 
          setResult={setResult} 
          setSelectedImage={setSelectedImage}
          setLoading={setLoading}
        />
      )}

      {loading && (
        <div className="w-fit relative rounded-md overflow-hidden mx-auto">
          <Image
            src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
            width={400}
            height={400}
            alt="Imagen Original"
            className="w-[400px] aspect-square object-cover"
          />
          <AppLoader text="Generando modelo 3D..." />
        </div>
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
