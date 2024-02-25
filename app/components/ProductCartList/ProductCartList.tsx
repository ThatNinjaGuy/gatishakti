"use client";

import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProductCounter from "../ProductCounter/ProductCounter";
import { CartItem } from "@/app/context/ProductCountContext";
import { ProductType } from "@/models/productDetails";

type Props = {
  productCartList: Map<String, CartItem>;
  increaseProductCount: (productKey: string, productType: ProductType) => void;
  decreaseProductCount: (productKey: string, productType: ProductType) => void;
};

const ProductCartList: FC<Props> = (props) => {
  const { productCartList, increaseProductCount, decreaseProductCount } = props;

  return (
    <div>
      {Array.from(productCartList.entries()).map(
        ([key, { productCount, productType }]) => (
          <div
            key={key.toString()}
            className="mt-5 grid grid-cols-2 gap-4 bg-white shadow-md"
          >
            <div className="col-span-1 ">
              <span className="flex items-center px-2 font-semibold">
                {productType.name}
              </span>
              <span className="flex items-center px-2 font-light italic">
                @ {productType.price}
              </span>
            </div>
            <ProductCounter
              value={productCount ?? 0}
              onIncrement={() =>
                increaseProductCount(key.toString(), productType)
              }
              onDecrement={() =>
                decreaseProductCount(key.toString(), productType)
              }
            />
          </div>
        )
      )}
    </div>
  );
};

export default ProductCartList;
