// Import necessary types from Next.js and Stripe
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16", // Ensure you use the correct API version
});

// Define the handler function with explicit types for request and response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Here you create a checkout session with the required parameters.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            // Example item. Replace with actual data or dynamic values from `req.body`
            price_data: {
              currency: "usd",
              product_data: {
                name: "T-shirt",
              },
              unit_amount: 2000, // Price in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      // Return the session ID to the client
      res.status(200).json({ sessionId: session.id });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed error
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
