export const getConfirmationEmailHtml = (name: string) => `
<div style="background-color:#f3f4f6; padding:40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.05); border:1px solid #e5e7eb;">
    
    <!-- Header -->
    <div style="background:#111827; padding:24px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600; letter-spacing:0.5px;">
        Thank You for Reaching Out
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <h2 style="margin-top:0; color:#111827; font-size:18px; font-weight:600;">
        Hi ${name},
      </h2>

      <p style="color:#374151; font-size:15px; line-height:1.7; margin-bottom:20px;">
        Thank you for contacting me through my portfolio website. I’ve received your message 
        and truly appreciate you taking the time to connect.
      </p>

      <p style="color:#374151; font-size:15px; line-height:1.7;">
        I will review your message and get back to you as soon as possible.
      </p>

      <!-- Divider -->
      <div style="margin:30px 0; border-top:1px solid #e5e7eb;"></div>

      <!-- Signature -->
      <p style="margin:0; color:#6b7280; font-size:14px;">Best regards,</p>
      <p style="margin:6px 0 0 0; color:#111827; font-weight:600; font-size:15px;">
        Nikhil Anand
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb; padding:18px; text-align:center; border-top:1px solid #e5e7eb;">
      <p style="margin:0; font-size:12px; color:#9ca3af;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>

  </div>
</div>
`;
