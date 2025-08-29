import { headers } from "next/headers";
import { EnvelopeView } from "./envelope";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/data/${params.id}`, {
    cache: "default",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 font-body">
        <h1 className="text-2xl font-semibold">
          ID <code className="font-mono">{params.id}</code> not found
        </h1>
        <p>Did you get the right code?</p>
      </div>
    );
  }

  const { name } = await res.json();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 font-body max-w-7xl mx-auto @container">
      <EnvelopeView name={name} />
    </div>
  );
}
