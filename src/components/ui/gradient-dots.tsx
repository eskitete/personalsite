import React, { useEffect, useRef } from "react";

/**
 * GradientPixelField (v2)
 * - 1px pixel squares supported (default)
 * - Pointer tracking fixed: listens on window so it works even when other elements overlay the background
 * - Safer DPR math; consistent CSS pixel space
 * - Parameters tuned so warp/inner gradient are visible even with tiny pixels
 */
export type GradientPixelFieldProps = {
  /** size of each square in CSS px (default 1 for true 1px dots) */
  pixelSize?: number;
  /** spacing between pixel centers (px). Keep >= pixelSize. default 20 */
  spacing?: number;
  /** seconds for a full hue rotation */
  colorCycleDuration?: number; // default 6
  /** background fill */
  backgroundColor?: string; // default "transparent"
  /** radius around cursor that gets special treatment (px) */
  cursorRadius?: number; // default 160
  /** strength of the warp displacement (px at center) */
  warpStrength?: number; // default 14
  /** faster color factor inside cursor zone (multiplier) */
  cursorColorBoost?: number; // default 2.25
  /** cap devicePixelRatio for perf */
  maxDevicePixelRatio?: number; // default 1.75
  className?: string;
  style?: React.CSSProperties;
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function GradientPixelField({
  pixelSize = 1,
  spacing = 20,
  colorCycleDuration = 6,
  backgroundColor = "transparent",
  cursorRadius = 160,
  warpStrength = 14,
  cursorColorBoost = 2.25,
  maxDevicePixelRatio = 1.75,
  className,
  style,
}: GradientPixelFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Cursor position in CSS pixels relative to the container's top-left
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
      return;
    }

    // device pixel ratio handling (capped)
    const getDPR = () => clamp(window.devicePixelRatio || 1, 1, maxDevicePixelRatio || 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = getDPR();
      const cw = Math.max(1, Math.floor(rect.width));
      const ch = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.max(1, Math.floor(cw * dpr));
      canvas.height = Math.max(1, Math.floor(ch * dpr));
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixel units
    };

    resize();
    resizeObsRef.current = new ResizeObserver(resize);
    resizeObsRef.current.observe(container);

    let running = true;
    let lastFrame = performance.now();
    const start = lastFrame;
    const frameInterval = 1000 / 30; // cap at 30fps to reduce CPU load

    const visibilityState = {
      isVisible: document.visibilityState === "visible",
      reduceMotion: false,
    };

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    visibilityState.reduceMotion = reduceMotionQuery.matches;
    const listeners: Array<() => void> = [];
    const cleanupMatchMedia = () => {
      if ("removeEventListener" in reduceMotionQuery) {
        reduceMotionQuery.removeEventListener("change", handleReduceMotionChange);
      } else {
        // @ts-expect-error fallback for older browsers
        reduceMotionQuery.removeListener(handleReduceMotionChange);
      }
    };

    const baseHueSpeed = 360 / (colorCycleDuration * 1000); // deg/ms
    const insideHueSpeed = baseHueSpeed * cursorColorBoost;

    const renderFrame = (now: number) => {
      // canvas size in CSS px (because of transform)
      const rect = canvas.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, cw, ch);
      } else {
        ctx.clearRect(0, 0, cw, ch);
      }

      const t = now - start;
      const baseHue = (t * baseHueSpeed) % 360;

      const { x: mx, y: my } = cursorRef.current;
      const r = cursorRadius;
      const r2 = r * r;

      const cols = Math.ceil(cw / spacing) + 1;
      const rows = Math.ceil(ch / spacing) + 1;

      for (let j = 0; j < rows; j++) {
        const y0 = j * spacing + spacing * 0.5;
        for (let i = 0; i < cols; i++) {
          const x0 = i * spacing + spacing * 0.5;

          const dx = x0 - mx;
          const dy = y0 - my;
          const d2 = dx * dx + dy * dy;
          const d = Math.sqrt(d2);

          // smooth falloff for warp
          const sigma = r * 0.6;
          const falloff = Math.exp(-d2 / (2 * sigma * sigma));

          // radial displacement with temporal ripple
          const angle = Math.atan2(dy, dx);
          const wave = Math.sin(now * 0.003 + d * 0.06);
          const disp = warpStrength * falloff * wave;
          const ox = Math.cos(angle) * disp;
          const oy = Math.sin(angle) * disp;

          const x = x0 + ox;
          const y = y0 + oy;

          // color
          const spatialPhase = (i + j) * 2; // degrees
          const insideHue = (t * insideHueSpeed + d * 0.3 + wave * 60) % 360;
          const hue = d2 < r2 ? (baseHue + insideHue + spatialPhase) % 360 : (baseHue + spatialPhase + d * 0.05) % 360;
          const light = d2 < r2 ? 60 + 18 * falloff * (0.5 + 0.5 * wave) : 56 + 6 * Math.sin(now * 0.0012 + i * 0.4);
          const sat = d2 < r2 ? 74 : 68;
          ctx.fillStyle = `hsl(${hue.toFixed(1)}, ${sat}%, ${light}%)`;

          // draw 1px square (or whatever pixelSize is), leaving grid gaps via spacing
          const s = pixelSize;
          ctx.fillRect(Math.round(x - s / 2) + 0.5, Math.round(y - s / 2) + 0.5, s, s);
        }
      }
    };

    const startLoop = () => {
      if (!running || visibilityState.reduceMotion || !visibilityState.isVisible || rafRef.current !== null) {
        return;
      }
      lastFrame = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const tick = (now: number) => {
      if (!running) {
        return;
      }
      if (visibilityState.reduceMotion || !visibilityState.isVisible) {
        rafRef.current = null;
        return;
      }

      if (now - lastFrame >= frameInterval) {
        lastFrame = now;
        renderFrame(now);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    function handleReduceMotionChange(event: MediaQueryListEvent) {
      visibilityState.reduceMotion = event.matches;
      if (visibilityState.reduceMotion) {
        stopLoop();
        renderFrame(performance.now());
      } else {
        startLoop();
      }
    }

    if ("addEventListener" in reduceMotionQuery) {
      reduceMotionQuery.addEventListener("change", handleReduceMotionChange);
    } else {
      // @ts-expect-error fallback for older browsers
      reduceMotionQuery.addListener(handleReduceMotionChange);
    }

    const handleVisibilityChange = () => {
      visibilityState.isVisible = document.visibilityState === "visible";
      if (visibilityState.isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    listeners.push(() => document.removeEventListener("visibilitychange", handleVisibilityChange));
    listeners.push(cleanupMatchMedia);

    renderFrame(performance.now());
    startLoop();

    // --- Pointer tracking on window (works even if other elements overlay) ---
    const updateFromEvent = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      cursorRef.current.x = clientX - rect.left;
      cursorRef.current.y = clientY - rect.top;
    };

    const onPointerMove = (e: PointerEvent) => updateFromEvent(e.clientX, e.clientY);
    const onPointerLeave = () => {
      cursorRef.current.x = -9999;
      cursorRef.current.y = -9999;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      resizeObsRef.current?.disconnect();
      running = false;
      stopLoop();
      listeners.forEach((cleanup) => cleanup());
    };
  }, [backgroundColor, colorCycleDuration, cursorRadius, cursorColorBoost, maxDevicePixelRatio, pixelSize, spacing, warpStrength]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

// Demo wrapper (optional)
export function DemoBackground() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <GradientPixelField
        className="absolute inset-0"
        pixelSize={1}
        spacing={20}
        colorCycleDuration={6}
        cursorRadius={160}
        warpStrength={14}
        backgroundColor="transparent"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold">Gradient Pixel Field</h1>
          <p className="opacity-80 mt-2">Move your cursor to see the warp + color pulse.</p>
        </div>
      </div>
    </div>
  );
}
