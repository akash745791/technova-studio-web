import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getEmployeeTasks, saveEmployeeTask } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employee_id");
  const status = searchParams.get("status");

  let tasks = await getEmployeeTasks();

  if (employeeId) {
    tasks = tasks.filter((t) => t.employee_id === employeeId);
  }
  if (status && status !== "all") {
    tasks = tasks.filter((t) => t.status === status);
  }

  return NextResponse.json({ success: true, data: tasks });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.employee_id) {
      return NextResponse.json(
        { success: false, error: "Task title and Employee assignment are required." },
        { status: 400 }
      );
    }

    const saved = await saveEmployeeTask(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Failed to save task" }, { status: 500 });
  }
}
