// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { loadStripe } from "@stripe/stripe-js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-10-16",
// });

// type RequestData = {
//   checkinDate: string;
//   checkoutDate: string;
//   adults: number;
//   children: number;
//   numberOfDays: number;
//   hotelRoomSlug: string;
// };

// let stripePromise;

// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
//   }
//   return stripePromise;
// };

// export async function POST(req: Request, res: Response) {
//   const {
//     checkinDate,
//     checkoutDate,
//     adults,
//     children,
//     hotelRoomSlug,
//     numberOfDays,
//   }: RequestData = await req.json();

//   if (
//     !checkinDate ||
//     !checkoutDate ||
//     !adults ||
//     !hotelRoomSlug ||
//     !numberOfDays
//   ) {
//     return new NextResponse("Please all fields are required", { status: 400 });
//   } else {
//     const redirectToCheckout = async () => {
//   const stripe = await getStripe();
//   const { error } = await stripe.redirectToCheckout({ sessionId: /* Session ID from your API */ });
//   // handle any errors
// };
//   }
// }
// This is your test secret API key.

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const calculateOrderAmount = (items: number) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

// export default async function handler(req: any, res: any) {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "eur",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// }

// // Import necessary types from Next.js and Stripe
// import type { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
//   apiVersion: "2023-10-16", // Ensure you use the correct API version
// });

// // Define the handler function with explicit types for request and response
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       // Here you create a checkout session with the required parameters.
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//           {
//             // Example item. Replace with actual data or dynamic values from `req.body`
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: "T-shirt",
//               },
//               unit_amount: 2000, // Price in cents
//             },
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${req.headers.origin}/cancel`,
//       });

//       // Return the session ID to the client
//       res.status(200).json({ sessionId: session.id });
//     } catch (err: any) {
//       console.error(err);
//       res.status(500).json({ statusCode: 500, message: err.message });
//     }
//   } else {
//     // If the request method is not POST, return a 405 Method Not Allowed error
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
