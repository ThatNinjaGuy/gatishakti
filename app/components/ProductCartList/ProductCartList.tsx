"use client";

import "react-datepicker/dist/react-datepicker.css";
import ProductCounter from "../ProductCounter/ProductCounter";
import {
  CartItem,
  useProductCartList,
} from "@/app/context/ProductCountContext";
import { calculateCostFromProductCount } from "@/utils/costCalculation";

const ProductCartList = () => {
  const { productCartList, updateProductCartList, removeProductFromCartList } =
    useProductCartList();

  return (
    <div>
      {Array.from(productCartList.entries()).map(
        ([key, { productCount, productType }]) => (
          <div
            key={key.toString()}
            className="mb-5 grid grid-cols-2 gap-4 bg-white shadow-md"
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
              onIncrement={() => {
                const updatedCartItem: CartItem = {
                  productType: productType,
                  productCount: productCount + 1,
                };
                updateProductCartList(key.toString(), updatedCartItem);
              }}
              onDecrement={() => {
                if (productCount > 1) {
                  const updatedCartItem: CartItem = {
                    productType: productType,
                    productCount: productCount - 1,
                  };
                  updateProductCartList(key, updatedCartItem);
                } else removeProductFromCartList(key);
              }}
            />
          </div>
        )
      )}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <span className="col-span-1 flex items-center px-2 font-bold text-2xl ">
          Total
        </span>
        <div className="col-span-1 flex items-center justify-center space-x-4 p-1 rounded-lg">
          <span className="text-2xl font-semibold">
            {"₹" + calculateCostFromProductCount(productCartList)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCartList;
