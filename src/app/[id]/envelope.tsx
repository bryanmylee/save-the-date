"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [isClosing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const listener = () => {
      if (state === EnvelopeState.Front) {
        setState(EnvelopeState.BackClosed);
      } else if (state === EnvelopeState.BackClosed) {
        setState(EnvelopeState.BackOpened);
      } else if (state === EnvelopeState.BackOpened) {
        setState(EnvelopeState.FullyRevealed);
      } else {
        setState(EnvelopeState.Front);
        setClosing(true);
        setTimeout(() => {
          setClosing(false);
        }, 700);
      }
    };
    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, [state]);

  return (
    <div className="relative overflow-hidden flex flex-col justify-center items-center">
      <div className="w-[100cqw] h-[100cqh] perspective-distant cursor-pointer">
        <div
          className={`transition-[transform_color] duration-700 transform-3d ${
            state === EnvelopeState.Front ? "" : "rotate-y-180"
          }`}
        >
          <Front name={name} />
          <Back state={state} isClosing={isClosing} />
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 transition-opacity duration-700 delay-1000  ${
          state === EnvelopeState.FullyRevealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex-1 max-w-7xl mx-auto flex justify-between items-center p-4 border-t border-stone-300 bg-stone-200">
          <p className="text-lg">{name.replaceAll("|", " ")}</p>

          <a
            href="/save-the-date.png"
            download
            className="text-white px-4 py-2 font-bold bg-stone-600"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

type FrontProps = {
  name: string;
};

export function Front({ name }: FrontProps) {
  return (
    <div className="absolute backface-hidden">
      <Image
        src="/envelope-front.png"
        alt=""
        width={2160}
        height={2160}
        priority
        className="pointer-events-none"
      />
      <div className="absolute top-[49%] left-[18%] right-[18%] bottom-[11%] flex items-center justify-center">
        <div className="leading-tight tracking-tighter">
          {name.split("|").map((n) => (
            <p key={n} className="text-[4cqw] font-signature text-center">
              {n}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

type BackProps = {
  state: EnvelopeState;
  isClosing: boolean;
};

export function Back({ state, isClosing }: BackProps) {
  return (
    <div className="absolute rotate-y-180 backface-hidden isolate">
      <div
        className={`relative transition-transform duration-700 ${
          state === EnvelopeState.FullyRevealed
            ? "translate-y-[25vh] scale-125"
            : ""
        }`}
      >
        <Image
          src="/envelope-back-inner.png"
          alt=""
          width={2160}
          height={2160}
          priority
          className="pointer-events-none"
        />
        <div className="absolute top-[-50%] left-[18%] right-[18%] bottom-[11%] flex items-center justify-center p-2 overflow-hidden">
          {/* This container size matches the envelope except on the top where it has an allowance for the envelope. */}
          <Image
            src="/save-the-date.png"
            alt="Save the date! Amanda and Bryan are getting married on 16 Jun 2026 at The Edge, Uluwatu, Bali. Formal invitation to follow"
            width={2550}
            height={3300}
            className={`transition-transform duration-700 ${
              state === EnvelopeState.FullyRevealed
                ? "translate-y-[10%]"
                : "translate-y-[90%]"
            }`}
          />
        </div>
        <Image
          src="/envelope-back-outer.png"
          alt=""
          width={2160}
          height={2160}
          priority
          className="absolute inset-0 pointer-events-none"
        />
        <Image
          src="/envelope-flap.png"
          alt=""
          width={2160}
          height={2160}
          priority
          className={`absolute inset-0 pointer-events-none transition-transform duration-700 origin-[50%_48%] ${
            state === EnvelopeState.BackOpened ||
            state === EnvelopeState.FullyRevealed
              ? "rotate-x-180 delay-100"
              : ""
          } ${
            state === EnvelopeState.FullyRevealed || isClosing ? "-z-10" : ""
          }`}
        />
      </div>
    </div>
  );
}
