import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send notification email to you
        const notificationData = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'niks.anand.developer@gmail.com',
            replyTo: email,
            subject: `New Contact Request from ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 8px;">
            <h2 style="color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">New Contact Request</h2>
            <p style="margin-top: 20px;"><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 6px;">
                <h3 style="margin-top: 0; font-size: 16px; color: #374151;">Message:</h3>
                <p style="white-space: pre-wrap; color: #4b5563; line-height: 1.5;">${message}</p>
            </div>
        </div>
      `,
        });

        // Send confirmation email to the sender
        const confirmationData = await resend.emails.send({
            from: 'Nikhil Anand <onboarding@resend.dev>',
            to: email,
            subject: 'Thank you for reaching out!',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #111827;">Hi ${name},</h2>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.
            </p>
            <div style="margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Best regards,</p>
                <p style="margin: 5px 0 0 0; color: #111827; font-weight: 600;">Nikhil Anand</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af; font-style: italic;">
                This is an automated message, please do not reply to this email.
            </p>
        </div>
      `,
        });

        if (notificationData.error || confirmationData.error) {
            console.error('Resend Error:', notificationData.error || confirmationData.error);
            return NextResponse.json(
                { success: false, message: 'Failed to send one or more emails.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
        });
    } catch (error) {
        console.error('Error in contact route:', error);
        return NextResponse.json(
            { success: false, message: 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
