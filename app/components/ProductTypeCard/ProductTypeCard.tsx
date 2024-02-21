import { ProductType } from "@/models/productDetails";
import { shortenDisplayText } from "@/utils/textProcessing";
import { FC, useEffect, useState } from "react";
import ProductCounter from "../ProductCounter/ProductCounter";

type Props = {
  room: ProductType;
  productCount: number | null;
  increaseProductCount: () => void;
  decreaseProductCount: () => void;
};

const ProductTypeCard: FC<Props> = (props) => {
  const {
    room: { name, price, description, sellingMetric },
    productCount,
    decreaseProductCount,
    increaseProductCount,
  } = props;

  console.log(productCount);

  return (
    <div
      className="flex flex-col rounded-xl w-42 mb-10 mx-auto md:mx-0 overflow-hidden text-black"
      style={{
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="flex flex-col justify-between flex-grow p-4 bg-white">
        <div>
          <div className="flex justify-between text-xl font-semibold">
            <p>{name}</p>
          </div>
          <p className="pt-3 pb-6 mb-2">
            {shortenDisplayText(description, 150)}
          </p>
        </div>
        <div className="p-2 shadow-lg">
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <ProductCounter
                value={productCount ?? 0}
                onDecrement={decreaseProductCount}
                onIncrement={increaseProductCount}
              />
            </div>{" "}
            <span className="col-span-1 flex justify-center items-center">
              /{sellingMetric}
            </span>
          </div>
          <div className="w-full border-b-2 border-b-secondary my-2" />
          <div className="grid grid-cols-2">
            <span className="col-span-1 italic font-light">@ ₹{price}</span>
            <span className="col-span-1 flex justify-end items-center font-semibold">
              Tot: ₹{price}
            </span>
          </div>
        </div>
        <div className="bg-primary mt-4 text-center w-full py-3 rounded-xl text-white font-bold hover:translate-y-2 hover:shadow-lg transition-all duration-500 flex flex-col items-center justify-center">
          <div className="inline-flex items-center">
            <span className="text-xl mr-2">{"Add to Cart"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTypeCard;
