"use client";

import { ProductType } from "@/models/productDetails";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProductCounter from "../ProductCounter/ProductCounter";

type Props = {
  productCartList: ProductType[];
  productCount: Map<String, number>;
  increaseProductCount: (productKey: string) => void;
  decreaseProductCount: (productKey: string) => void;
};

const ProductCartList: FC<Props> = (props) => {
  const {
    productCartList,
    productCount,
    increaseProductCount,
    decreaseProductCount,
  } = props;

  return (
    <div>
      {productCartList.map((product) => (
        <div
          key={product._key}
          className="mt-5 grid grid-cols-2 gap-4 bg-white shadow-md"
        >
          <div className="col-span-1 ">
            <span className="flex items-center px-2 font-semibold">
              {product.name}
            </span>
            <span className="flex items-center px-2 font-light italic">
              @ {product.price}
            </span>
          </div>
          <ProductCounter
            value={productCount.get(product._key) ?? 0}
            onIncrement={() => increaseProductCount(product._key)}
            onDecrement={() => decreaseProductCount(product._key)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductCartList;
