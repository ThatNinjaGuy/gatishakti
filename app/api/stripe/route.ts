import { authOptions } from "@/libs/auth";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

type RequestData = {
  total: number;
};

export async function POST(req: Request, res: Response) {
  const { total }: RequestData = await req.json();
  if (!total) {
    return new NextResponse("Cart is empty", { status: 400 });
  }

  const origin = req.headers.get("origin");
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Authentication required", { status: 401 });
  }

  const userId = session.user.id;
  try {
    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "inr",
            product_data: {
              name: "Please make the payment to complete your order",
            },
            unit_amount: total * 100,
          },
        },
      ],
      //   line_items: lineItems,
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`,
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment session created",
    });
  } catch (err) {
    console.log("Payment failed: ", err);
    return new NextResponse("Payment Failed", { status: 500 });
  }
}
