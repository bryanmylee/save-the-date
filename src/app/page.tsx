"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        router.push(`/${code}`);
      }}
      className="min-h-screen flex flex-col justify-center items-center gap-4 font-body"
    >
      <h1 className="text-2xl font-semibold">Enter your code</h1>

      <div className="flex gap-4">
        <input
          autoFocus
          name="code"
          type="text"
          value={code}
          onChange={(ev) => {
            setCode(ev.target.value);
          }}
          className="bg-stone-300 px-4 py-2 border-b-2 border-stone-600 font-mono tracking-widest w-[12ch] text-center"
        />

        <button className="bg-stone-600 text-white px-4 py-2 font-bold">
          Go
        </button>
      </div>
    </form>
  );
}
