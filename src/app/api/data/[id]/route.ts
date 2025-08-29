import { NextResponse } from "next/server";

const nameForId: Record<string, string> = {
  "643625": "Mom & Dad",
  "003296": "Benjamin, my best man",
  "520784": "Ho Juin Jie and Marianne Terng",
  "425504": "Brennan Sze To",
  "940125": "Yeo Yong Kang",
  "263905": "Emmanuel Oh and Joyce (?)",
  "895245": "Ma",
  "184195": "Derrick Ng & Andrea Ng|Alexandria Ng & Annabeth Ng",
  "201940": "Bernard Ong and Stephanie Goh",
  "154526": "James Koh & Namuunaa Nadmid",
  "597813": "Ng Yen",
  "410513": "Vaisnavi Subramaniam",
  "395710": "Bernice Tan",
  "232878": "Mike",
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
