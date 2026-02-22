import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getConfirmationEmailHtml } from '@/emails/ConfirmationEmail';
import { getNotificationEmailHtml } from '@/emails/NotificationEmail';

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
            from: 'Portfolio Contact <message@nikhilanand.space>',
            to: 'niks.anand.developer@gmail.com',
            replyTo: email,
            subject: `New Contact Request from ${name}`,
            html: getNotificationEmailHtml(name, email, message),
        });

        // Send confirmation email to the sender
        const confirmationData = await resend.emails.send({
            from: 'Nikhil Anand <noreply@nikhilanand.space>',
            to: email,
            subject: 'Thank you for reaching out!',
            html: getConfirmationEmailHtml(name),
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
