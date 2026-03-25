import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-04-10",
});

export const createCheckoutSession = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated.");
  }

  const { priceId, successUrl, cancelUrl } = request.data as {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  };

  const db = getFirestore();
  const userId = request.auth.uid;
  const userEmail = request.auth.token.email ?? "";

  // Get or create Stripe customer
  const subDoc = await db.collection("subscriptions").doc(userId).get();
  let customerId: string | undefined = subDoc.data()?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userEmail,
      metadata: { firebaseUID: userId },
    });
    customerId = customer.id;
    await db.collection("subscriptions").doc(userId).set(
      { stripeCustomerId: customerId },
      { merge: true }
    );
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { firebaseUID: userId },
  });

  return { url: session.url };
});
