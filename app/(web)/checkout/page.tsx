"use client";

import ProductCartList from "@/app/components/ProductCartList/ProductCartList";
import { useState } from "react";

const Checkout = () => {
  const [primaryDeliveryOption, setPrimaryDeliveryOption] = useState("");

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row shadow-2xl p-5">
        {/* Left side - Product Cart List */}
        <div className="flex-1">
          <ProductCartList />
        </div>

        <div className="w-1/2 ml-4">
          {/* Payment Options */}
          <div className="flex flex-row space-x-4 mb-5  shadow-md p-5">
            <label className="mr-22 font-semibold">Make Payment</label>
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
            </div>
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="deliveryType"
                  className="form-radio h-5 w-5"
                  value="cod"
                />
                <span>Cash On Delivery(COD)</span>
              </label>
            </div>
          </div>
          {/* Delivery Options */}
          <div className="mb-5 shadow-md p-5">
            <div className="flex flex-row space-x-4 ">
              <label className="mr-5 font-semibold">
                Choose Delivery Option
              </label>
              <div>
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
              </div>
              <div>
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
            </div>
            {/* Conditionally render the delivery customization options */}
            {primaryDeliveryOption === "home" && (
              <div className="mt-4 p-4 border rounded-md">
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
                    <span>Standard Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliveryType"
                      className="form-radio h-5 w-5"
                      value="express"
                    />
                    <span>Express Delivery</span>
                  </label>
                  {/* Add more customization options as needed */}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mt-5 shadow-md p-5">
            <label className="font-semibold self-start mb-2">Address</label>
            {/* <Link href={`/checkout`}> */}
            <button
              // onClick={handleBookNowClick}
              className="border h-fit w-1/2 text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-3 lg:px-5 rounded-2xl font-bold "
            >
              Add Address
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
