import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminDb();
    const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "12");

    // Try to get all vehicles first (no filter)
    const snapshot = await db.collection("vehicles").limit(limit).get();

    const vehicles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

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
