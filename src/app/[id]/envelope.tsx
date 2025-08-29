"use client";

import Image from "next/image";
import { useState } from "react";

type EnvelopeViewProps = {
  name: string;
};

const enum EnvelopeState {
  Front = 0,
  BackClosed = 1,
  BackOpened = 2,
  FullyRevealed = 3,
}

export function EnvelopeView({ name }: EnvelopeViewProps) {
  const [state, setState] = useState(EnvelopeState.Front);

  return (
    <div className="overflow-hidden flex flex-col justify-center items-center">
      <div className="w-[100cqw] h-[100cqw] perspective-distant cursor-pointer">
        <div
          className={`relative w-full h-full transition-[transform_color] duration-700 transform-3d ${
            state === EnvelopeState.Front
              ? "-translate-y-40"
              : state === EnvelopeState.FullyRevealed
              ? "translate-y-50 rotate-y-180 bg-stone-500/50"
              : "rotate-y-180"
          }`}
        >
          <Front
            name={name}
            onClickEnvelope={() => {
              setState(EnvelopeState.BackClosed);
            }}
          />
          <Back
            state={state}
            onClickEnvelope={() => {
              if (state === EnvelopeState.BackOpened) {
                setState(EnvelopeState.FullyRevealed);
              } else if (state !== EnvelopeState.FullyRevealed) {
                setState(EnvelopeState.BackOpened);
              }
            }}
          />
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 transition-opacity duration-700 delay-1000 bg-stone-200/50 ${
          state === EnvelopeState.FullyRevealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex-1 max-w-7xl mx-auto flex justify-between items-center p-4 border-t border-stone-300">
          <p className="text-lg">{name}</p>

          <a className="bg-stone-600 text-white px-4 py-2 font-bold">
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

type FrontProps = {
  name: string;
  onClickEnvelope: () => void;
};

export function Front({ name, onClickEnvelope }: FrontProps) {
  return (
    <div
      className="absolute w-full h-full backface-hidden"
      onClick={() => {
        onClickEnvelope();
      }}
    >
      <Image
        src="/envelope-front.png"
        alt=""
        width={2160}
        height={2160}
        priority
      />
      <div className="absolute top-[49%] left-[18%] right-[18%] bottom-[11%] flex items-center justify-center">
        <p className="text-[5cqw] font-signature text-center">{name}</p>
      </div>
    </div>
  );
}

type BackProps = {
  state: EnvelopeState;
  onClickEnvelope: () => void;
};

export function Back({ state, onClickEnvelope }: BackProps) {
  return (
    <div
      className="absolute w-full h-full rotate-y-180 backface-hidden isolate"
      onClick={() => {
        onClickEnvelope();
      }}
    >
      <Image
        src="/envelope-back-inner.png"
        alt=""
        width={2160}
        height={2160}
        priority
        className="absolute inset-0"
      />
      <div className="absolute left-[18%] right-[18%] top-[-30%] bottom-[24%] flex items-center justify-center p-2 overflow-hidden">
        <Image
          src="/save-the-date.png"
          alt="Save the date! Amanda and Bryan are getting married on 16 Jun 2026 at The Edge, Uluwatu, Bali. Formal invitation to follow"
          width={2550}
          height={3300}
          className={`transition-transform duration-700 ${
            state === EnvelopeState.FullyRevealed
              ? "translate-y-0"
              : "translate-y-[82%]"
          }`}
        />
      </div>
      <Image
        src="/envelope-back-outer.png"
        alt=""
        width={2160}
        height={2160}
        priority
        className="absolute inset-0"
      />
      <Image
        src="/envelope-flap.png"
        alt=""
        width={2160}
        height={2160}
        priority
        className={`absolute inset-0 transition-transform duration-700 origin-[50%_48%] ${
          state === EnvelopeState.BackOpened ||
          state === EnvelopeState.FullyRevealed
            ? "rotate-x-180"
            : ""
        } ${state === EnvelopeState.FullyRevealed ? "-z-10" : ""}`}
      />
    </div>
  );
}
