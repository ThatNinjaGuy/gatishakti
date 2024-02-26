"use client";

import MapComponent from "@/app/components/MapComponent/MapComponent";
import ProductCartList from "@/app/components/ProductCartList/ProductCartList";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { getStripe } from "@/libs/stripe";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [primaryDeliveryOption, setPrimaryDeliveryOption] = useState("");

  const shadowStyle = "shadow-lg";
  const buttonStyle =
    "bg-tertiary-dark text-white px-6 py-2 lg:py-2 rounded-full font-bold transition duration-300 ease-in-out hover:bg-tertiary-darker";

  const handleCheckoutClick = async () => {
    const stripe = await getStripe();
    try {
      const total = 1400;
      const { data: stripeSession } = await axios.post("/api/stripe", {
        total,
      });
      if (stripe && stripeSession && stripeSession.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });
        if (result.error) {
          toast.error("Payment Failed");
        }
      } else {
        toast.error("Please login to checkout");
      }
    } catch (err) {
      // if (err.status === 401) {
      //   console.log
      // }
      console.log("Payment error: ", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div
        className={`md:grid md:grid-cols-12 ${shadowStyle} dark:bg-slate-600 p-5 rounded-lg`}
      >
        {/* Left side - Product Cart List */}
        <div className="md:col-span-4 pr-4">
          <h3>
            <span className="font-bold text-xl text-tertiary-dark ">
              Your Cart
            </span>
          </h3>
          {/* <div className="w-full border-b-2 border-b-secondary mt-2 mb-5" /> */}
          <div className=" rounded-md mt-2">
            <ProductCartList />
          </div>
          {/* <div className="w-full border-b-2 border-b-secondary mt-2 mb-5" /> */}
        </div>

        {/* Right side - Delivery and Payment Options */}
        <div className="md:col-span-8 ml-4 mt-4 ">
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
              <div className="mt-4 p-4 border rounded-md">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
