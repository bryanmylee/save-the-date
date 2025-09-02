"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function VideoBackground() {
  const isLowPowerRef = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

  return (
    <>
      <video
        ref={(videoNode) => {
          if (videoNode == null) return;
          videoNode.playbackRate = 0.5;

          // We cannot test low-power mode any other way because iOS does not
          // emit any video events reliably (pause, stalled, loadeddata, etc).
          //
          // To check for low-power mode, we wait a few seconds, then check
          // if the video is loaded and paused.
          //
          // 0: HAVE_NOTHING
          // 1: HAVE_METADATA
          // 2: HAVE_CURRENT_DATA
          // 3: HAVE_FUTURE_DATA
          // 4: HAVE_ENOUGH_DATA
          if (videoNode.readyState >= 2 && videoNode.paused) {
            isLowPowerRef.current = true;
            setShowFallback(true);
          }

          // In case the first check was a false negative, we check again.
          const secondCheckTimeout = setTimeout(() => {
            if (
              videoNode.readyState >= 2 &&
              videoNode.paused &&
              !isLowPowerRef.current
            ) {
              isLowPowerRef.current = true;
              setShowFallback(true);
            }
          }, 2000);

          return () => {
            clearTimeout(secondCheckTimeout);
          };
        }}
        src="/waves.webm"
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 object-cover w-screen h-screen opacity-40 ${
          showFallback ? "hidden" : "block"
        }`}
      />
      <Image
        src="/waves.webp"
        alt="Background wave image"
        width={800}
        height={1061}
        aria-hidden
        className={`absolute inset-0 object-cover w-screen h-screen opacity-40 blur-sm ${
          showFallback ? "block" : "hidden"
        }`}
      />
    </>
  );
}
