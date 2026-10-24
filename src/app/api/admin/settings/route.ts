import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/store";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function POST(req: NextRequest) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
