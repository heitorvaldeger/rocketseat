import { getSession } from "@/lib/iron-session";
import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession(req, res);

  const products = session.products ?? [];
  const productsPromises = products.map((product) => {
    return new Promise(async (resolve, reject) => {
      try {
        const productStripe = await stripe.products.retrieve(product.id, {
          expand: ["default_price"],
        });

        const price = productStripe.default_price as Stripe.Price;
        const priceFormatted = ((price.unit_amount ?? 0) / 100).toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          },
        );

        resolve({
          id: productStripe.id,
          name: productStripe.name,
          imageUrl: productStripe.images[0],
          url: productStripe.url,
          price: (price.unit_amount ?? 0) / 100,
          priceFormatted,
          description: productStripe.description,
          defaultPriceId: price.id,
        });
      } catch (error) {
        reject(error);
      }
    });
  });

  const newProducts = await Promise.all(productsPromises);

  return res.status(200).json({
    cartLength: session.products ? session.products.length : 0,
    products: newProducts,
  });
}
