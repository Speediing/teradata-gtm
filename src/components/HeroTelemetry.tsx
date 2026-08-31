"use client";

import { useEffect, useRef, useState } from "react";
import { startHeroTelemetry } from "@/lib/startHeroTelemetry";

export function HeroTelemetry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return startHeroTelemetry(canvas, () => setLive(true));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={live ? "hero-telemetry is-live" : "hero-telemetry"}
      aria-hidden
    />
  );
}
