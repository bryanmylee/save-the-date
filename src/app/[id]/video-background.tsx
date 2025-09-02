"use client";

export function VideoBackground() {
  return (
    <video
      ref={(node) => {
        if (node != null) {
          node.playbackRate = 0.5;
        }
      }}
      src="/waves.webm"
      autoPlay
      muted
      loop
      className="absolute inset-0 object-cover w-screen h-screen opacity-40"
    />
  );
}
