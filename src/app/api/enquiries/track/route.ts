import { NextRequest, NextResponse } from "next/server";
import { getEnquiries } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const refParam = searchParams.get("ref");

    if (!refParam || refParam.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid Reference ID (e.g. TNS-2026-XXXXX)" },
        { status: 400 }
      );
    }

    const cleanRef = refParam.trim().toUpperCase();
    const enquiries = await getEnquiries();
    const found = enquiries.find(
      (e) => e.reference_id.toUpperCase() === cleanRef || e.id.toUpperCase() === cleanRef
    );

    if (!found) {
      return NextResponse.json(
        {
          success: false,
          error: `No enquiry found for Reference ID "${cleanRef}". Please verify the ID or contact us directly on WhatsApp (+91 74579 12227).`,
        },
        { status: 404 }
      );
    }

    // Return only safe client-facing details (exclude private internal notes and email errors)
    const clientSafeData = {
      reference_id: found.reference_id,
      client_name: found.client_name,
      project_title: found.project_title,
      service_slug: found.service_slug || "website-development",
      status: found.status,
      timeline: found.timeline || "Standard (3-4 weeks)",
      preferred_contact_method: found.preferred_contact_method,
      created_at: found.created_at,
    };

    return NextResponse.json({
      success: true,
      data: clientSafeData,
    });
  } catch (err: any) {
    console.error("Tracking API error:", err);
    return NextResponse.json(
      { success: false, error: "Server error occurred while checking reference ID status." },
      { status: 500 }
    );
  }
}
