import 'stripe';

{
  console.warn("STRIPE_SECRET_KEY is missing from environment variables.");
}
const stripe = null;

export { stripe as s };
