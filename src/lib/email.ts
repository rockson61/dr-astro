import { Resend } from 'resend';

const resendApiKey = import.meta.env.RESEND_API_KEY;

export const sendWelcomeEmail = async (email: string, name: string) => {
    if (!resendApiKey) {
        console.warn("RESEND_API_KEY is missing. Skipping email.");
        return;
    }

    const resend = new Resend(resendApiKey);

    try {
        await resend.emails.send({
            from: 'DentalReach <onboarding@dentalreach.today>',
            to: email,
            subject: 'Welcome to DentalReach!',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #0F172A;">Welcome, ${name}!</h1>
                    <p>Thank you for joining the world's leading digital platform for dental professionals.</p>
                    <p>Here you can:</p>
                    <ul>
                        <li>Read the latest clinical articles</li>
                        <li>Connect with peers</li>
                        <li>Showcase your work</li>
                    </ul>
                    <a href="https://dentalreach.today/dashboard" style="background: #0F172A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
                </div>
            `
        });
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
};

export const sendNewsletterSubscriptionEmail = async (email: string) => {
    if (!resendApiKey) return;

    try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
            from: 'DentalReach <newsletter@dentalreach.today>',
            to: email,
            subject: 'Subscription Confirmed',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1>You're Subscribed!</h1>
                    <p>You will now receive our weekly digest of top dental insights.</p>
                </div>
            `
        });
    } catch (error) {
        console.error("Failed to send subscription email:", error);
    }
};
