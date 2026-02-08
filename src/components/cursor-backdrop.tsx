"use client";

import { useEffect, useRef } from "react";

export function CursorBackdrop() {
  const gradientLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gradientLayer = gradientLayerRef.current;

    if (!gradientLayer) {
      return;
    }

    const reducedMotionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let targetX = pointerX;
    let targetY = pointerY;
    let frameId: number | null = null;

    const updateGradientPosition = () => {
      pointerX += (targetX - pointerX) * 0.12;
      pointerY += (targetY - pointerY) * 0.12;

      gradientLayer.style.setProperty("--cursor-x", `${pointerX}px`);
      gradientLayer.style.setProperty("--cursor-y", `${pointerY}px`);

      if (Math.abs(targetX - pointerX) > 0.4 || Math.abs(targetY - pointerY) > 0.4) {
        frameId = window.requestAnimationFrame(updateGradientPosition);
      } else {
        frameId = null;
      }
    };

    const requestFrame = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateGradientPosition);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      requestFrame();
    };

    const handlePointerLeave = () => {
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight / 2;
      requestFrame();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };

    const enableInteraction = () => {
      gradientLayer.style.setProperty("--cursor-alpha", "1");
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave);
      requestFrame();
    };

    const disableInteraction = () => {
      cleanupListeners();
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = null;
      gradientLayer.style.setProperty("--cursor-alpha", "0.45");
      gradientLayer.style.setProperty("--cursor-x", "50vw");
      gradientLayer.style.setProperty("--cursor-y", "35vh");
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        disableInteraction();
      } else {
        enableInteraction();
      }
    };

    if (reducedMotionMediaQuery.matches) {
      disableInteraction();
    } else {
      enableInteraction();
    }

    reducedMotionMediaQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      cleanupListeners();
      reducedMotionMediaQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div ref={gradientLayerRef} className="cursor-backdrop-gradient absolute inset-0" />
      <div className="cursor-backdrop-noise absolute inset-0" />
    </div>
  );
}
