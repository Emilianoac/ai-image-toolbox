"use client";

import React, { useEffect, useRef } from "react";
import "@google/model-viewer";

interface ModelViewerProps extends React.HTMLAttributes<HTMLElement> {
  "src": string;
  "alt": string;
  "ar"?: boolean;
  "className"?: string;
  "ar-modes"?: string;
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "autoplay"?: boolean;
  "style"?: React.CSSProperties;
  "environment-image"?: string;
  "skybox-image"?: string;
  "shadow-intensity"?: string;
  "camera-orbit"?: string;
  "max-camera-orbit"?: string;
}

function AppModelViewer({ src, alt, className, style, ...rest }: ModelViewerProps) {

  const modelViewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (modelViewerRef.current) {
      const modelViewer = modelViewerRef.current.querySelector("model-viewer");
      if (modelViewer) {
        Object.keys(rest).forEach((key) => {
          (modelViewer as HTMLElement).setAttribute(key, (rest as Record<string, string | number | boolean>)[key].toString());
        });
        // Asignar la clase manualmente
        if (className) {
          modelViewer.setAttribute("class", className);
        }
      }

    }
  }, [rest]);

  return (
    <div ref={modelViewerRef} className="w-fit mx-auto max-w-full rounded-md overflow-hidden">
      <model-viewer 
        src={src} 
        alt={alt}  
        style={style ?? {}}
      />
    </div>
  );
}

export default React.memo(AppModelViewer);
