import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminDb();
    const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "12");
    const snapshot = await db
      .collection("vehicles")
      .where("status", "==", "published")
      .get();

    const vehicles = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .slice(0, limit);

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
