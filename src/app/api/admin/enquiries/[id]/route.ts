import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { updateEnquiry, deleteEnquiry, getEnquiryById } from "@/lib/store";
import { sendEnquiryNotification } from "@/lib/email";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  if (body.retry_email) {
    const enquiry = await getEnquiryById(id);
    if (!enquiry) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }
    const result = await sendEnquiryNotification(enquiry);
    const updated = await updateEnquiry(id, {
      notification_status: result.sent ? "sent" : "failed",
      notification_error: result.error || undefined,
    });
    return NextResponse.json({ success: true, data: updated, emailResult: result });
  }

  const updated = await updateEnquiry(id, {
    status: body.status,
    internal_notes: body.internal_notes,
    assigned_to: body.assigned_to,
    assigned_employee_name: body.assigned_employee_name,
  });

  if (!updated) {
    return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteEnquiry(id);
  return NextResponse.json({ success: true, message: "Enquiry deleted" });
}
