import { loadStripe, Stripe } from "@stripe/stripe-js";
let stripePromise: undefined | Promise<Stripe | null> = undefined;
const getStripe = () => {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!stripePromise && stripePublicKey) {
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
};
export default getStripe;
