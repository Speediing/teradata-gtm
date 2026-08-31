/// <reference types="@webgpu/types" />
import { clock, effect, frame, frameLoop, init, surface } from "vgpu";
import type { Frame, FrameLoopHandle, Gpu } from "vgpu";
import telemetryShader from "./hero-telemetry.wgsl";

const CLEAR: readonly [number, number, number, number] = [0, 0, 0, 0];

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Starts the hero WebGPU loop on `canvas`. Call the returned function to tear it down. */
export function startHeroTelemetry(
  canvas: HTMLCanvasElement,
  onReady?: () => void,
): () => void {
  let disposed = false;
  let loop: FrameLoopHandle | undefined;
  let gpu: Gpu | undefined;

  void (async () => {
    if (!navigator.gpu) return;

    try {
      gpu = await init();
    } catch {
      return;
    }
    if (disposed) {
      gpu.dispose();
      return;
    }

    try {
      const canvasSurface = surface(gpu, canvas, {
        dpr: [1, 2],
        alphaMode: "premultiplied",
        clearColor: CLEAR,
      });

      const telemetry = effect(gpu, telemetryShader, {
        label: "hero-telemetry",
        blend: "premultiplied",
        set: { params: { time: 0, texel: canvasSurface.texelSize } },
      });

      canvasSurface.onResize(() => {
        telemetry.set({ params: { texel: canvasSurface.texelSize } });
      });

      const time = clock(gpu);
      const drawFrame = (currentFrame: Frame) => {
        telemetry.set({ params: { time: time.time } });
        currentFrame.pass({ target: canvasSurface, clear: CLEAR }, telemetry);
      };

      if (prefersReducedMotion()) {
        frame(gpu, drawFrame);
      } else {
        loop = frameLoop(gpu, drawFrame);
      }

      if (!disposed) onReady?.();
    } catch {
      gpu.dispose();
    }
  })();

  return () => {
    disposed = true;
    loop?.stop();
    gpu?.dispose();
  };
}
