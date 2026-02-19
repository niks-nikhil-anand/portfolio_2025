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

        // Send email using Resend
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Use onboarding@resend.dev for testing if no verified domain is present
            to: 'niks.anand.developer@gmail.com', // Your email address
            replyTo: email, // This allows you to reply directly to the sender
            subject: `New Contact Request from ${name}`,
            html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return NextResponse.json(
                { success: false, message: 'Failed to send message.' },
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
