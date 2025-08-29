import { NextResponse } from "next/server";

const nameForId: Record<string, string> = {
  "154526": "James and Namuna",
};

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const name = nameForId[id];
  if (name == null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ id, name }, { status: 200 });
}
