"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen flex-1">
      <h1>Enter your code:</h1>

      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          router.push(`/${code}`);
        }}
      >
        <input
          name="code"
          type="text"
          value={code}
          onChange={(ev) => {
            setCode(ev.target.value);
          }}
        />

        <button>Go</button>
      </form>
    </div>
  );
}
