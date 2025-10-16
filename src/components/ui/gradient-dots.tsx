import React, { useEffect, useRef } from "react";

export type GradientPixelFieldProps = {
  pixelSize?: number;
  spacing?: number;
  colorCycleDuration?: number;
  backgroundColor?: string;
  cursorRadius?: number;
  warpStrength?: number;
  cursorColorBoost?: number;
  maxDevicePixelRatio?: number;
  className?: string;
  style?: React.CSSProperties;
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
type Dot = { x0: number; y0: number; col: number; row: number };

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
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const dotsRef = useRef<Dot[]>([]);

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

    const getDPR = () => clamp(window.devicePixelRatio || 1, 1, maxDevicePixelRatio || 2);

    const computeEffectiveSpacing = (cw: number, ch: number) => {
      const baseSpacing = Math.max(spacing, pixelSize, 0.5);
      const area = cw * ch;
      const approxDots = area / (baseSpacing * baseSpacing || 1);
      const maxDots = 6000;

      if (!Number.isFinite(approxDots) || approxDots <= maxDots) {
        return baseSpacing;
      }

      const factor = Math.min(Math.sqrt(approxDots / maxDots), 4);
      return baseSpacing * factor;
    };

    const rebuildDots = (cw: number, ch: number) => {
      const effectiveSpacing = computeEffectiveSpacing(cw, ch);
      const cols = Math.max(1, Math.ceil(cw / effectiveSpacing) + 1);
      const rows = Math.max(1, Math.ceil(ch / effectiveSpacing) + 1);
      const nextDots: Dot[] = [];

      for (let row = 0; row < rows; row++) {
        const y0 = row * effectiveSpacing + effectiveSpacing * 0.5;
        for (let col = 0; col < cols; col++) {
          const x0 = col * effectiveSpacing + effectiveSpacing * 0.5;
          nextDots.push({ x0, y0, col, row });
        }
      }

      dotsRef.current = nextDots;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = getDPR();
      const cw = Math.max(1, Math.floor(rect.width));
      const ch = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.max(1, Math.floor(cw * dpr));
      canvas.height = Math.max(1, Math.floor(ch * dpr));
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvasSizeRef.current = { width: cw, height: ch };
      rebuildDots(cw, ch);
    };

    resize();
    resizeObsRef.current = new ResizeObserver(resize);
    resizeObsRef.current.observe(container);

    let running = true;
    let lastFrame = performance.now();
    const start = lastFrame;
    const frameInterval = 1000 / 30;

    const visibilityState = {
      isVisible: document.visibilityState === "visible",
      reduceMotion: false,
    };

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    visibilityState.reduceMotion = reduceMotionQuery.matches;

    const baseHueSpeed = 360 / (colorCycleDuration * 1000);
    const insideHueSpeed = baseHueSpeed * cursorColorBoost;

    const renderFrame = (now: number) => {
      const { width: cw, height: ch } = canvasSizeRef.current;
      if (!cw || !ch) {
        return;
      }

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, cw, ch);
      } else {
        ctx.clearRect(0, 0, cw, ch);
      }

      const dots = dotsRef.current;
      if (dots.length === 0) {
        return;
      }

      const t = now - start;
      const baseHue = (t * baseHueSpeed) % 360;
      const { x: mx, y: my } = cursorRef.current;
      const r = cursorRadius;
      const r2 = r * r;
      const sigma = r * 0.6;

      for (const { x0, y0, col, row } of dots) {
        const dx = x0 - mx;
        const dy = y0 - my;
        const d2 = dx * dx + dy * dy;
        const d = Math.sqrt(d2);

        const falloff = Math.exp(-d2 / (2 * sigma * sigma));
        const angle = Math.atan2(dy, dx);
        const wave = Math.sin(now * 0.002 + d * 0.05) * 0.75;
        const disp = warpStrength * falloff * wave;
        const x = x0 + Math.cos(angle) * disp;
        const y = y0 + Math.sin(angle) * disp;

        const spatialPhase = (col + row) * 1.6;
        const insideHue = (t * insideHueSpeed + d * 0.25 + wave * 45) % 360;
        const hue =
          d2 < r2
            ? (baseHue + insideHue + spatialPhase) % 360
            : (baseHue + spatialPhase + d * 0.05) % 360;

        const light =
          d2 < r2
            ? 58 + 12 * falloff * (0.5 + 0.5 * wave)
            : 54 + 4 * Math.sin(now * 0.0012 + col * 0.35);
        const sat = d2 < r2 ? 64 : 56;
        ctx.fillStyle = `hsl(${hue.toFixed(1)}, ${sat}%, ${light}%)`;

        const s = pixelSize;
        ctx.fillRect(Math.round(x - s / 2) + 0.5, Math.round(y - s / 2) + 0.5, s, s);
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

    const handleReduceMotionChange = (event: MediaQueryListEvent) => {
      visibilityState.reduceMotion = event.matches;
      if (visibilityState.reduceMotion) {
        stopLoop();
        renderFrame(performance.now());
      } else {
        startLoop();
      }
    };

    const handleVisibilityChange = () => {
      visibilityState.isVisible = document.visibilityState === "visible";
      if (visibilityState.isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    if ("addEventListener" in reduceMotionQuery) {
      reduceMotionQuery.addEventListener("change", handleReduceMotionChange);
    } else {
      // @ts-expect-error fallback for older browsers
      reduceMotionQuery.addListener(handleReduceMotionChange);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    const cleanupVisibility = () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);

    renderFrame(performance.now());
    startLoop();

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
      running = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      resizeObsRef.current?.disconnect();
      if ("removeEventListener" in reduceMotionQuery) {
        reduceMotionQuery.removeEventListener("change", handleReduceMotionChange);
      } else {
        // @ts-expect-error fallback for older browsers
        reduceMotionQuery.removeListener(handleReduceMotionChange);
      }
      cleanupVisibility();
    };
  }, [backgroundColor, colorCycleDuration, cursorRadius, cursorColorBoost, maxDevicePixelRatio, pixelSize, spacing, warpStrength]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export function DemoBackground() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <GradientPixelField
        className="absolute inset-0"
        pixelSize={1}
        spacing={24}
        colorCycleDuration={12}
        cursorRadius={140}
        warpStrength={10}
        cursorColorBoost={1.5}
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
