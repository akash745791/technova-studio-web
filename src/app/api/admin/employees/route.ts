import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getEmployees, saveEmployee } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const employees = await getEmployees();
  return NextResponse.json({ success: true, data: employees });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.name || !body.role) {
      return NextResponse.json(
        { success: false, error: "Name and Role are required." },
        { status: 400 }
      );
    }

    const saved = await saveEmployee(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Failed to save employee" }, { status: 500 });
  }
}
