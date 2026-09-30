import { NextRequest, NextResponse } from "next/server";
import { listPublishedVehicles } from "@/lib/data/vehicles";

export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "12");
    const vehicles = await listPublishedVehicles(limit);

    return NextResponse.json(vehicles, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching vehicles:", errorMessage);
    return NextResponse.json(
      {
        error: "Failed to fetch vehicles",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
