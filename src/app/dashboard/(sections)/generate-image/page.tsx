
import GenerateImageClient from "@/components/dashboard/generate-image/GenerateImageClient";
import type { Metadata } from "next";
import appMetaData from "@/constants/meta-data";

export const metadata: Metadata = {
  title: appMetaData.generateImage.title,
  description: appMetaData.generateImage.description
}


export default function page() {
  return (
    <GenerateImageClient />
  )
}
