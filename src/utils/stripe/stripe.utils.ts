import { loadStripe } from "@stripe/stripe-js";

const reactAppStripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string;

export const stripePromise = loadStripe(reactAppStripePublishableKey);