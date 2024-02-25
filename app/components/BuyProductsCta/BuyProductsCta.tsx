"use client";

import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProductCartList from "../ProductCartList/ProductCartList";
import { calculateCostFromProductCount } from "@/utils/costCalculation";
import { CartItem } from "@/app/context/ProductCountContext";
import { ProductType } from "@/models/productDetails";

type Props = {
  // handleBookNowClick: () => void;
  productCartList: Map<String, CartItem>;
  increaseProductCount: (productKey: string, productType: ProductType) => void;
  decreaseProductCount: (productKey: string, productType: ProductType) => void;
};

const BuyProductsCta: FC<Props> = (props) => {
  const { productCartList, increaseProductCount, decreaseProductCount } = props;

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
      <ProductCartList
        productCartList={productCartList}
        increaseProductCount={increaseProductCount}
        decreaseProductCount={decreaseProductCount}
      />
      <div className="mt-5 grid grid-cols-2 gap-4">
        <span className="col-span-1 flex items-center px-2">Total</span>
        <div className="col-span-1 flex items-center justify-center space-x-4 p-1 rounded-lg">
          <span className="text-2xl font-semibold">
            {"₹" + calculateCostFromProductCount(productCartList)}
          </span>
        </div>
      </div>
      <button
        // onClick={handleBookNowClick}
        className="mt-5 btn-primary w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {"Buy Now"}
      </button>
    </div>
  );
};

export default BuyProductsCta;
