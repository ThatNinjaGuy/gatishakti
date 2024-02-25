"use client";

import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProductCounter from "../ProductCounter/ProductCounter";

type Props = {
  productCartList: Map<String, number>;
  increaseProductCount: (productKey: string) => void;
  decreaseProductCount: (productKey: string) => void;
};

const ProductCartList: FC<Props> = (props) => {
  const { productCartList, increaseProductCount, decreaseProductCount } = props;

  return (
    <div>
      {Array.from(productCartList.entries()).map(([key, value]) => (
        <div
          key={key.toString()}
          className="mt-5 grid grid-cols-2 gap-4 bg-white shadow-md"
        >
          <div className="col-span-1 ">
            <span className="flex items-center px-2 font-semibold">{key}</span>
            <span className="flex items-center px-2 font-light italic">
              @ {value}
            </span>
          </div>
          <ProductCounter
            value={value ?? 0}
            onIncrement={() => increaseProductCount(key.toString())}
            onDecrement={() => decreaseProductCount(key.toString())}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductCartList;
