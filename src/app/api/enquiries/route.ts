import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations";
import { createEnquiry, getEnquiries } from "@/lib/store";
import { generateReferenceId } from "@/lib/utils";
import { sendEnquiryNotification } from "@/lib/email";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod validation & Honeypot check
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check honeypot for bot detection
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json(
        { success: false, error: "Bot detected" },
        { status: 400 }
      );
    }

    // 2. Generate reference ID
    const reference_id = generateReferenceId();

    // 3. Persist enquiry to real database / repository
    const newEnquiry = await createEnquiry({
      reference_id,
      client_name: data.client_name,
      email: data.email,
      phone: data.phone || undefined,
      business_name: data.business_name || undefined,
      service_slug: data.service_slug,
      project_title: data.project_title,
      project_description: data.project_description,
      budget_range: data.budget_range || undefined,
      timeline: data.timeline || undefined,
      preferred_contact_method: data.preferred_contact_method,
      status: "new",
      privacy_consent: data.privacy_consent,
      notification_status: "pending",
      created_at: new Date().toISOString(),
    });

    // 4. Attempt email notification
    const emailResult = await sendEnquiryNotification(newEnquiry);
    newEnquiry.notification_status = emailResult.sent
      ? "sent"
      : emailResult.provider === "none"
      ? "skipped"
      : "failed";
    if (emailResult.error) {
      newEnquiry.notification_error = emailResult.error;
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully. We will review your project and contact you soon.",
      reference_id: newEnquiry.reference_id,
      data: {
        id: newEnquiry.id,
        reference_id: newEnquiry.reference_id,
        status: newEnquiry.status,
      },
    });
  } catch (err: any) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Server error occurred while saving enquiry. Please try again or reach out on WhatsApp.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await getEnquiries();
  return NextResponse.json({ success: true, data: enquiries });
}
