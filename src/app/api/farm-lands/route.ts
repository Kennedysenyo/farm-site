import { db } from "@/db";
import { farmlands, FarmlandType } from "@/db/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const farmLands: FarmlandType[] = await db.select().from(farmlands);

    if (!farmLands) throw new Error("Failed to fetch data");

    const res = NextResponse.json(farmLands, { status: 200 });
    res.headers.set(
      "Cache-Control",
      "public, s-maxage=180, stale-white-revalidate=30",
    );
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(error.message, { status: 500 });
    }
    return NextResponse.json(error, { status: 400 });
  }
};
