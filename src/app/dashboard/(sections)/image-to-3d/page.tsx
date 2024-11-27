import ImageTo3dClient from "@/components/dashboard/image-to-3d/ImageTo3dClient";

import type { Metadata } from "next";
import appMetaData from "@/constants/meta-data";

export const metadata: Metadata = {
  title: appMetaData.imageTo3d.title,
  description: appMetaData.imageTo3d.description
}

export default function page() {
  return (
    <ImageTo3dClient />
  )
}
