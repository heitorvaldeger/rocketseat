import { getSession } from "@/lib/iron-session";
import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession(req, res);

  if (!session.products || !session.products.length) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const priceIds = session.products.map((product) => product.priceId);
  const lineItems = priceIds.map((priceId: string) => ({
    price: priceId,
    quantity: 1,
  }));
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: lineItems,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
