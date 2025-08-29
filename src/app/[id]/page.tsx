import { headers } from "next/headers";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/data/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div>
        <h1>ID {params.id} not found</h1>
        <p>Did you get the right code?</p>
      </div>
    );
  }

  const { name } = await res.json();

  return (
    <div>
      <h1>Welcome {name}</h1>

      <Image
        src="/save-the-date.png"
        alt="Save the date! Amanda and Bryan are getting married on 16 Jun 2026 at The Edge, Uluwatu, Bali. Formal invitation to follow"
        width={2550}
        height={3300}
        priority
      />
    </div>
  );
}
