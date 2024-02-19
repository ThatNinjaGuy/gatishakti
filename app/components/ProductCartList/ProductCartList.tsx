"use client";

import { ProductType } from "@/models/productDetails";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  productCartList: ProductType[];
};

const ProductCartList: FC<Props> = (props) => {
  const { productCartList } = props;

  return (
    <div>
      {productCartList.map((product) => (
        <div
          key={product._key}
          className="mt-5 grid grid-cols-2 gap-4 bg-white shadow-md"
        >
          <span className="col-span-1 flex items-center px-2">
            {product.name}
          </span>
          <div className="col-span-1 flex items-center justify-center space-x-4 p-1 rounded-lg">
            <button className="rounded-full bg-red-100 text-red-500 w-10 h-10 flex items-center justify-center">
              <span className="text-large">-</span>
            </button>
            <span className="text-2xl font-semibold">45</span>
            <button className="rounded-full bg-green-100 text-green-500 w-10 h-10 flex items-center justify-center">
              <span className="text-large">+</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCartList;
