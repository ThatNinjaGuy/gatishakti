"use client";

import MapComponent from "@/app/components/MapComponent/MapComponent";
import ProductCartList from "@/app/components/ProductCartList/ProductCartList";
import Link from "next/link";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );
  }
  return stripePromise;
};

//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
// );
// console.log(stripePromise);
const Checkout = () => {
  //   const [clientSecret, setClientSecret] = useState(stripePromise);
  const [primaryDeliveryOption, setPrimaryDeliveryOption] = useState("");

  const shadowStyle = "shadow-lg"; // softer shadow
  const buttonStyle =
    "bg-tertiary-dark text-white px-6 py-2 lg:py-2 rounded-full font-bold transition duration-300 ease-in-out hover:bg-tertiary-darker";

  //   useEffect(() => {
  //     // Create PaymentIntent as soon as the page loads
  //     fetch("/api/create-payment-intent", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setClientSecret(data.clientSecret))
  //       .catch((err) => console.error(err))
  //       .finally(() => setClientSecret(stripePromise));
  //   }, []);

  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  const handleCheckoutClick = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Include any additional data you want to pass to the API like product info
      body: JSON.stringify({
        /* Your cart items and any other data needed */
      }),
    });
    console.log(response);
    // if (response.ok) stripe.redirectToCheckout({ sessionId: "lkmlkmklmlkmlk" });
    const session = await response.json();
    if (response.ok) {
      stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      // Handle errors here
    }
  };

  // console.log(clientSecret);
  return (
    <div className="container mx-auto px-4 py-6">
      <div className={`flex flex-row ${shadowStyle} p-5 rounded-lg bg-white`}>
        {/* Left side - Product Cart List */}
        <div className="flex-1 pr-4">
          <ProductCartList />
        </div>

        {/* Right side - Delivery and Payment Options */}
        <div className="w-1/2 ml-4 ">
          <Link href={`/checkout`}>
            <button
              onClick={handleCheckoutClick}
              className="mb-5 btn-primary w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {"Place Order"}
            </button>
          </Link>
          {/* Payment Options */}
          <div className={`mb-5 ${shadowStyle} rounded-lg p-5`}>
            <label className="block font-semibold mb-3 ">Make Payment</label>
            <div className="flex items-center space-x-5">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentType"
                  className="form-radio h-5 w-5"
                  value="online"
                />
                <span>Online</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentType"
                  className="form-radio h-5 w-5"
                  value="cod"
                />
                <span>Cash On Delivery (COD)</span>
              </label>
            </div>
          </div>

          {/* Delivery Options */}
          <div className={`mb-5 ${shadowStyle} rounded-lg p-5`}>
            <label className="block font-semibold mb-3">
              Choose Delivery Option
            </label>
            <div className="flex items-center space-x-5">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="primaryDeliveryOption"
                  className="form-radio h-5 w-5"
                  value="home"
                  onChange={(e) => setPrimaryDeliveryOption(e.target.value)}
                />
                <span>Get at home</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="primaryDeliveryOption"
                  className="form-radio h-5 w-5"
                  value="pickup"
                  onChange={(e) => setPrimaryDeliveryOption(e.target.value)}
                />
                <span>Pickup from store</span>
              </label>
            </div>

            {/* Conditionally render the delivery customization options */}
            {primaryDeliveryOption === "home" && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <div>
                  <p className="text-lg font-semibold mb-3">
                    Customize your delivery:
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="deliveryType"
                        className="form-radio h-5 w-5"
                        value="standard"
                      />
                      <span>Standard Delivery (Get it tomorrow by 10 AM)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="deliveryType"
                        className="form-radio h-5 w-5"
                        value="express"
                      />
                      <span>Express Delivery (Get it ASAP)</span>
                    </label>
                  </div>
                </div>
                <div
                  className={`flex flex-col items-center mt-5 ${shadowStyle} p-5 rounded-lg`}
                >
                  <label className="font-semibold self-start mb-2 w-full">
                    Address
                  </label>
                  <button className={buttonStyle}>Add Address</button>
                </div>

                <MapComponent />
              </div>
            )}
            {/* <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
