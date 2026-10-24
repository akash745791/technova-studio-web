import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { saveService, deleteService, getServices } from "@/lib/store";

export async function GET() {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const services = await getServices(true);
  return NextResponse.json({ success: true, data: services });
}

export async function POST(req: NextRequest) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const saved = await saveService(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
  }

  await deleteService(id);
  return NextResponse.json({ success: true, message: "Service deleted" });
}
