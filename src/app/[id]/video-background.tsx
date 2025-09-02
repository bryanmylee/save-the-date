"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoBackground() {
  const [isLowPower, setLowPower] = useState(false);

  if (isLowPower) {
    return (
      <Image
        src="/waves.webp"
        alt="Background wave image"
        width={800}
        height={1061}
        aria-hidden
        className="absolute inset-0 object-cover w-screen h-screen opacity-40"
      />
    );
  }

  return (
    <video
      ref={(node) => {
        if (node != null) {
          node.playbackRate = 0.5;
          if (node.currentTime === 0 && (node.paused || node.ended)) {
            setLowPower(true);
          }
        }
      }}
      src="/waves.webm"
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 object-cover w-screen h-screen opacity-40"
    />
  );
}
