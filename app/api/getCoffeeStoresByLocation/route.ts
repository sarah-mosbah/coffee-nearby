import { fetchCoffeeStores } from "@/app/lib/coffee-stores";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const longLat = searchParams.get("longLat") || "";
    const limit = searchParams.get("limit") || "";

    if (longLat) {
      const coffeStores = await fetchCoffeeStores(longLat, parseInt(limit));

      return NextResponse.json(coffeStores);
    }
  } catch (error) {
    console.error("Error Occured", error);

    return NextResponse.json(
      {
        message: "Error Occured While retrieving Coffee stores",
      },
      {
        status: 500,
      }
    );
  }
}
