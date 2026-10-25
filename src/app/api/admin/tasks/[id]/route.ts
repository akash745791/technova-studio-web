import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { deleteEmployeeTask, getEmployeeTaskById, saveEmployeeTask } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const existing = await getEmployeeTaskById(id);
  if (!existing) {
    return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 });
  }

  const updated = await saveEmployeeTask({ ...existing, ...body, id });
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteEmployeeTask(id);
  return NextResponse.json({ success: true, message: "Task deleted successfully" });
}
