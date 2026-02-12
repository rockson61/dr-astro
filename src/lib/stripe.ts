import Stripe from 'stripe';

if (!import.meta.env.STRIPE_SECRET_KEY) {
    console.warn("STRIPE_SECRET_KEY is missing from environment variables.");
}

export const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-12-18.acacia', // Use latest stable or pinned version
    typescript: true,
});
