"use client";

import { ProductType } from "@/models/productDetails";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProductCounter from "../ProductCounter/ProductCounter";

type Props = {
  productCartList: ProductType[];
};

const ProductCartList: FC<Props> = (props) => {
  const { productCartList } = props;

  const onProductAdded = () => {};

  const onProductRemoved = () => {};

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
            value={45}
            onDecrement={onProductRemoved}
            onIncrement={onProductAdded}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductCartList;
