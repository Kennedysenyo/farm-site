import { db } from "@/db";
import { products } from "@/db/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const productsData = await db.select().from(products);

    if (!productsData || productsData.length === 0) {
      return NextResponse.json(
        { error: { message: "No products found." } },
        { status: 404 },
      );
    }

    const res = NextResponse.json(productsData, { status: 200 });
    res.headers.set(
      "Cache-Control",
      "public, s-maxage=180, stale-while-revalidate=30",
    );
    return res;
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: { message: "Internal server error." } },
      { status: 500 },
    );
  }
};
