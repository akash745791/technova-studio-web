import { Enquiry } from "./types";

interface SendNotificationResult {
  sent: boolean;
  error?: string;
  provider?: string;
}

export async function sendEnquiryNotification(enquiry: Enquiry): Promise<SendNotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL_TO || "technovastudio.in@gmail.com";
  const fromEmail = process.env.NOTIFICATION_EMAIL_FROM || "TECHNOVA STUDIO <notifications@technovastudio.in>";

  if (!apiKey) {
    console.info(`[Email Service] RESEND_API_KEY not configured. Notification for ref ${enquiry.reference_id} marked as skipped.`);
    return {
      sent: false,
      provider: "none",
      error: "Resend API key not configured in environment variables",
    };
  }

  try {
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0c111b; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 24px;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #00e5ff; margin: 0 0 6px 0;">New Project Enquiry — TECHNOVA STUDIO</h2>
          <p style="margin: 0; color: #94a3b8; font-size: 14px;">Reference ID: <strong>${enquiry.reference_id}</strong></p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; width: 140px;">Client Name:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${enquiry.client_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Email Address:</td>
            <td style="padding: 8px 0; color: #00e5ff;"><a href="mailto:${enquiry.email}" style="color: #00e5ff; text-decoration: none;">${enquiry.email}</a></td>
          </tr>
          ${enquiry.phone ? `
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Phone:</td>
            <td style="padding: 8px 0; color: #ffffff;">${enquiry.phone}</td>
          </tr>` : ''}
          ${enquiry.business_name ? `
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Business Name:</td>
            <td style="padding: 8px 0; color: #ffffff;">${enquiry.business_name}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Selected Service:</td>
            <td style="padding: 8px 0; color: #ffffff;">${enquiry.service_slug || 'General Enquiry'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Project Title:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${enquiry.project_title}</td>
          </tr>
          ${enquiry.budget_range ? `
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Budget Range:</td>
            <td style="padding: 8px 0; color: #ffffff;">${enquiry.budget_range}</td>
          </tr>` : ''}
          ${enquiry.timeline ? `
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Desired Timeline:</td>
            <td style="padding: 8px 0; color: #ffffff;">${enquiry.timeline}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Preferred Contact:</td>
            <td style="padding: 8px 0; color: #ffffff; text-transform: capitalize;">${enquiry.preferred_contact_method}</td>
          </tr>
        </table>

        <div style="background: rgba(255,255,255,0.03); border-left: 3px solid #00e5ff; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 14px;">Project Description:</h4>
          <p style="margin: 0; color: #cbd5e1; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${enquiry.project_description}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
          <p style="margin: 0; color: #64748b; font-size: 12px;">This is an automated notification from the TECHNOVA STUDIO web portal.</p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `[Enquiry: ${enquiry.reference_id}] ${enquiry.project_title} - ${enquiry.client_name}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { sent: false, provider: "resend", error: `Resend HTTP ${res.status}: ${errText}` };
    }

    return { sent: true, provider: "resend" };
  } catch (err: any) {
    return { sent: false, provider: "resend", error: err.message || "Failed to send email" };
  }
}
