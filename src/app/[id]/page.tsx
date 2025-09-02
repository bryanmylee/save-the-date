import { headers } from "next/headers";
import { EnvelopeView } from "./envelope";
import { VideoBackground } from "./video-background";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const id = (await params).id;

  const res = await fetch(`${protocol}://${host}/api/data/${id}`, {
    cache: "default",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 font-body">
        <h1 className="text-2xl font-semibold">
          ID <code className="font-mono">{id}</code> not found
        </h1>
        <p>Did you get the right code?</p>
      </div>
    );
  }

  const { name } = await res.json();

  return (
    <div className="relative flex min-h-screen">
      <VideoBackground>
        <div className="flex-1 flex flex-col justify-center items-center gap-4 font-body max-w-7xl mx-auto @container">
          <EnvelopeView name={name} />
        </div>
      </VideoBackground>
    </div>
  );
}
