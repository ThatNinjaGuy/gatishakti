import { Product } from "@/models/constructtionmaterial";
import { shortenDisplayText } from "@/utils/textProcessing";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  product: Product;
};

const RoomCard: FC<Props> = (props) => {
  const {
    product: { coverImage, name, price, description },
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
            {/* Price can be shown here if needed */}
          </div>
          {/* <p className="pt-2 text-xs">{type} Room</p> */}
          {/* Set a fixed number of lines for the description */}
          {/* <p className="pt-3 pb-6 overflow-hidden text-xs line-clamp-N">
            {description}
          </p> */}
          <p className="pt-3 pb-6">{shortenDisplayText(description, 150)}</p>
        </div>
        <Link
          // href={`/materials/${slug.current}`}
          href={`/materials`}
          className="bg-primary mt-4 inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:translate-y-2 hover:shadow-lg transition-all duration-500"
        >
          {"Starts From ₹" + price + "/trailer"}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
