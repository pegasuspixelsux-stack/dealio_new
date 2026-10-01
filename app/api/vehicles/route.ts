import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminDb();
    const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "12");

    // Try to get all vehicles first (no filter)
    const snapshot = await db.collection("vehicles").limit(limit).get();

    const placeholders = [
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3effbb7cb6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570355394211-b71861f2e7b5?w=800&h=600&fit=crop",
    ];

    const vehicles = snapshot.docs.map((doc, index) => ({
      id: doc.id,
      ...doc.data(),
      photos: [{ url: placeholders[index % placeholders.length], path: `placeholder/${index}` }]
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
