export const getNotificationEmailHtml = (name: string, email: string, message: string) => `
<div style="background-color:#f3f4f6; padding:40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.05); border:1px solid #e5e7eb;">
    
    <!-- Header -->
    <div style="background:#111827; padding:24px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600; letter-spacing:0.5px;">
        New Contact Request
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="color:#6b7280; font-size:14px; margin-bottom:4px;">From</p>
      <h2 style="margin-top:0; color:#111827; font-size:18px; font-weight:600;">
        ${name} (${email})
      </h2>

      <!-- Divider -->
      <div style="margin:20px 0; border-top:1px solid #e5e7eb;"></div>

      <p style="color:#6b7280; font-size:14px; margin-bottom:8px;">Message Content</p>
      <div style="padding:20px; background-color:#f9fafb; border-radius:8px; border:1px solid #e5e7eb;">
        <p style="color:#374151; font-size:15px; line-height:1.7; margin:0; white-space: pre-wrap;">
          ${message}
        </p>
      </div>

      <div style="margin-top:24px;">
        <a href="mailto:${email}" style="display:inline-block; padding:12px 24px; background-color:#111827; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px;">
          Reply to ${name}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb; padding:18px; text-align:center; border-top:1px solid #e5e7eb;">
      <p style="margin:0; font-size:12px; color:#9ca3af;">
        Sent from your Portfolio Website
      </p>
    </div>

  </div>
</div>
`;
