import { Product } from "@/models/constructionMaterial";
import { shortenDisplayText } from "@/utils/textProcessing";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = (props) => {
  const {
    product: { coverImage, name, slug, price, description, sellingMetric },
  } = props;
  return (
    <div
      className="flex flex-col rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black"
      style={{
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="h-60 overflow-hidden">
        <Image
          src={coverImage.url}
          alt={name}
          width={250}
          height={250}
          className="img scale-animation"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4 bg-white">
        <div>
          <div className="flex justify-between text-xl font-semibold">
            <p>{name}</p>
          </div>
          <p className="pt-3 pb-6">{shortenDisplayText(description, 150)}</p>
        </div>
        <Link
          href={`/materials/${slug.current}`}
          className="bg-primary mt-4 text-center w-full py-4 rounded-xl text-white font-bold hover:translate-y-2 hover:shadow-lg transition-all duration-500 flex flex-col items-center justify-center"
        >
          <span className="text-base mb-2">Range starts from</span>
          <div className="inline-flex items-center">
            <span className="text-xl mr-2">{"₹" + price}</span>
            <span className="text-sm">{sellingMetric}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
