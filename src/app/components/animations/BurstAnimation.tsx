import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import burstData from "./burstData";

interface BurstAnimationProps {
  /** Pixel size of the rendered square. Defaults to 64. */
  size?: number;
  /** Playback speed multiplier. Defaults to 2 for a snappy burst. */
  speed?: number;
}

/**
 * Plays the Burst-6 Lottie animation once from the embedded JSON.
 * No network request — fully self-contained.
 */
export function BurstAnimation({ size = 64, speed = 2 }: BurstAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: burstData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
        clearCanvas: true,
      },
    });

    anim.setSpeed(speed);

    return () => {
      anim.destroy();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        pointerEvents: "none",
      }}
    />
  );
}