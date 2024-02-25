"use client";

import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProductCartList from "../ProductCartList/ProductCartList";
import { CartItem } from "@/app/context/ProductCountContext";
import Link from "next/link";

type Props = {
  // handleBookNowClick: () => void;
  productCartList: Map<String, CartItem>;
};

const BuyProductsCta: FC<Props> = (props) => {
  const { productCartList } = props;

  return (
    <div className="px-7 py-6">
      <h3>
        <span className="font-bold text-xl text-tertiary-dark ">
          Building your home
        </span>
      </h3>
      <div className="w-full border-b-2 border-b-secondary my-2" />
      {productCartList && productCartList.size > 0 ? (
        <h4 className=" text-gray-900 dark:text-gray-400 pt-2">
          Get the best quality service to have a hassle free experience in
          building your home. Order in bulk to save more!
        </h4>
      ) : (
        <h4 className=" text-gray-900 dark:text-gray-400 pt-2">
          Add our products and services to start building your home.
        </h4>
      )}
      <ProductCartList />

      <Link href={`/checkout`}>
        <button
          // onClick={handleBookNowClick}
          className="mt-5 btn-primary w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {"Buy Now"}
        </button>
      </Link>
      {/* <Link
        href={`/materials`}
        className="mt-5 btn-primary w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Buy Now
      </Link> */}
    </div>
  );
};

export default BuyProductsCta;
