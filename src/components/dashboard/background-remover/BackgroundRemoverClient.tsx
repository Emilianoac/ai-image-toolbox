"use client";

import { useState, useEffect } from "react";
import { removeBackground } from "@imgly/background-removal";
import ImageResult from "./ImageResult";
import UploadImage from "./UploadImage";
import { FaDownload, FaTrash } from "react-icons/fa";
import Styles from "./BackgroundRemoverClient.module.css";

export default function BackgroundRemoverClient() {
  const [user_image, setUserImage] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!user_image) return;
    async function handleRemoveBackground() {
      const result = await removeBackground(user_image);
      const url = URL.createObjectURL(result);
      setResult(url);
    }

    handleRemoveBackground();
  }, [user_image])

  function resetData() {
    setUserImage("");
    setResult("");
  }

  return (
    <div className="flex flex-col md:flex-row gap-3">
      { !user_image ?
        <UploadImage setUserImage={setUserImage}/> : 
        <ImageResult
          imageWithBg={user_image} 
          imageWithoutBg={result} 
        />
      }

      { result && 
        <ActionsList 
          result={result} 
          resetData={() => resetData()} 
        />
      }
    </div>
  )
}


interface ActionsListProps {
  result: string;
  resetData: () => void;
}

function ActionsList({ result, resetData }: ActionsListProps) {
  return (
    <ul className={`${Styles.actionsList}`}>
      <li>
        <a
          href={result}
          title="Descargar imagen"
          download={`result-${new Date().getTime()}.png`}
          className="action-button">
          <FaDownload />
        </a>
      </li>
      <li>
        <button
          title="Eliminar imagen"
          onClick={() => resetData()}
          className="action-button">
          <FaTrash />
        </button>
      </li>
    </ul>
  )
}




