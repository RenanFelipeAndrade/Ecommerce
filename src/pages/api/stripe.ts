import { CartItem } from "@/@types/CartItem";
import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
interface NextApiRequestWithCartIteme extends NextApiRequest {
  body: {
    cartItems: CartItem[];
  };
}

export default async function handler(
  req: NextApiRequestWithCartIteme,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MgDUgISiCWSOhXExnwIT8uH" },
          { shipping_rate: "shr_1MgBsNISiCWSOhXE97P4AEb3" },
        ],
        line_items: req.body.cartItems.map((item) => {
          const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
          const img = item.image[0].asset._ref;
          const newImg = img
            .replace(
              "image-",
              `https://cdn.sanity.io/images/${projectId}/production/`
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
