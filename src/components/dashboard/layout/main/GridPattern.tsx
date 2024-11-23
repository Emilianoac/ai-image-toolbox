"use client"; 
import React, { useEffect } from "react";

type GridPatternProps = React.HTMLAttributes<HTMLCanvasElement> 

export default function GridPattern({ ...props }: GridPatternProps) {

  useEffect(() => {
    const canvas = document.getElementById("gridCanvas") as HTMLCanvasElement;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;

      if (!parent) {
        console.error("No se encontró el contenedor padre del canvas");
        return;
      }
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("No se pudo obtener el contexto 2d del canvas");
        return;
      }

      const gridSize = 10;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.strokeStyle = "gray"; 
      ctx.lineWidth = 0.2; 

      for (let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }

      for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas id="gridCanvas" className="block" {...props}></canvas>
  );
}
