import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export async function GET(request: NextRequest) {
  try {
    const app = initializeApp(firebaseConfig, { name: "api-vehicles" });
    const db = getFirestore(app);

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
