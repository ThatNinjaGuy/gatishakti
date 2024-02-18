import { ProductDetails, ProductType } from "@/models/productDetails";
import { shortenDisplayText } from "@/utils/textProcessing";
import Link from "next/link";
import { FC } from "react";

type Props = {
  room: ProductType;
};

const ProductTypeCard: FC<Props> = (props) => {
  const {
    room: { name, price, description },
  } = props;
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
          <p className="pt-3 pb-6">{shortenDisplayText(description, 150)}</p>
        </div>
        <div className="bg-primary mt-4 text-center w-full py-3 rounded-xl text-white font-bold hover:translate-y-2 hover:shadow-lg transition-all duration-500 flex flex-col items-center justify-center">
          <div className="inline-flex items-center">
            <span className="text-xl mr-2">{"Add to cart + ₹" + price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTypeCard;
