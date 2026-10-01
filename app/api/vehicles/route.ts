import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import { collection, query, where, getDocs } from "firebase-admin/firestore";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminDb();
    const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "12");
    const vehiclesRef = collection(db, "vehicles");
    const q = query(vehiclesRef, where("status", "==", "published"));
    const snapshot = await getDocs(q);

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
