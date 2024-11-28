"use client";

import ImageResult from "./image-result/ImageResult";
import UploadImage from "./upload-image/UploadImage";
import { FaDownload, FaTrash } from "react-icons/fa";
import Styles from "./BackgroundRemoverClient.module.css";
import { useAppStore } from "@/providers/app-state-provider";

export default function BackgroundRemoverClient() {

  const { removeBackgroundState, upadteRBResult, updateRBOriginalImage } = useAppStore((state) => state);

  function resetData() {
    upadteRBResult(undefined);
    updateRBOriginalImage(undefined);
  }

  return (
    <div className="flex flex-col md:flex-row gap-3">
      { !removeBackgroundState.result ? <UploadImage/> : <ImageResult/> }

      { removeBackgroundState.result && 
        <ActionsList  result={removeBackgroundState.result}  resetData={resetData} />
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
