import Stripe from 'stripe';

{
  console.warn("STRIPE_SECRET_KEY is missing from environment variables.");
}
const stripe = new Stripe("", {
  apiVersion: "2024-12-18.acacia",
  // Use latest stable or pinned version
  typescript: true
});

export { stripe as s };
