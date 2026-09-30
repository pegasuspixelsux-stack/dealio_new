import { NextRequest, NextResponse } from "next/server";
import { seedVehicles } from "@/lib/scripts/seedVehicles";

export async function POST(request: NextRequest) {
  try {
    const result = await seedVehicles();

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        count: 0,
        message: `API error: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "Use POST /api/seed to seed the database with test vehicles",
      instructions: "curl -X POST http://localhost:3000/api/seed",
    },
    { status: 200 }
  );
}
