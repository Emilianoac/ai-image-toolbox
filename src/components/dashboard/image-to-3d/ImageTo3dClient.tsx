"use client";

import AddImage from "./AddImage";
import FinalResult from "./FinalResult";
import { useAppStore } from "@/providers/app-state-provider";

export default function ImageTo3dClient() {
  const { imageTo3dState } = useAppStore((state) => state);

  return (
    <>
      {!imageTo3dState.result ? <AddImage/> : <FinalResult/>}
    </>
  )
}
