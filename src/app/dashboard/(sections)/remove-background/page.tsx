import BackgroundRemoverClient from "@/components/dashboard/background-remover/BackgroundRemoverClient";

import type { Metadata } from "next";
import appMetaData from "@/constants/meta-data";

export const metadata: Metadata = {
  title: appMetaData.removeBackground.title,
  description: appMetaData.removeBackground.description
}

export default function page() {

  return (
    <BackgroundRemoverClient/>
  )
}
