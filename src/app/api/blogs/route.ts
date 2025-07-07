import { db } from "@/db";
import { blogs } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const data = await db.select().from(blogs);
    if (!data)
      return NextResponse.json("Data Fetching Error!", { status: 400 });
    const response = NextResponse.json(data, { status: 200 });
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=180, stale-white-revalidate=30",
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
    return NextResponse.json(error as string, { status: 400 });
  }
};
