"use client";

import { getProductDetails } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import BuyProductsCta from "@/app/components/BuyProductsCta/BuyProductsCta";
import { useState } from "react";
import { toast } from "react-hot-toast";
import YouTubeEmbed from "@/app/components/YoutubeVideoPlayer/YoutubeVideoPlayer";
import Image from "next/image";
import ProductTypeCard from "@/app/components/ProductTypeCard/ProductTypeCard";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);
  // THis is currently being harcoded but room capacity should be taken as
  //     room parameter and should be passed here to make it dynamic
  const maxAdults = 4,
    minAdults = 1,
    maxChildren = 5,
    minChildren = 0;

  const fetchRoom = async () => getProductDetails(slug);

  const { data: product, error, isLoading } = useSWR("/api/product", fetchRoom);

  if (error) throw new Error("Cannot fetch rooms details");
  if (typeof product === "undefined" && !isLoading)
    throw new Error("Cannot fetch room details");

  if (!product) return <LoadingSpinner />;

  const calculateMinimumCheckoutDate = () => {
    if (checkInDate) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = () => {
    if (!checkInDate)
      return toast.error("Please provide appropriate check in date");

    if (!checkOutDate)
      return toast.error("Please provide appropriate check out date");

    if (checkInDate >= checkOutDate)
      return toast.error("Please choose a valid checkin period");

    if (adults < minAdults || adults > maxAdults)
      return toast.error(
        `Number of adults should be between ${minAdults} and ${maxAdults}`
      );

    if (childrenNum < minChildren || childrenNum > maxChildren)
      return toast.error(
        `Number of children should be between ${minChildren} and ${maxChildren}`
      );

    console.log("Will start booking room now");
  };

  return (
    <div>
      <div className="container mx-auto ">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div className=" w-full h-80 items-center">
              <Image
                alt="gallery"
                className="img"
                src={product.coverImage.url}
                width={200}
                height={200}
              />
            </div>
            <div className="my-5">
              <h2 className="font-bold text-3xl mb-2">{product.name}</h2>
              <p>{product.description}</p>
            </div>
            <div className="my-11">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {product.productTypes ? (
                  product.productTypes.map((productType) => (
                    <ProductTypeCard
                      key={productType._key}
                      room={productType}
                    />
                  ))
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className="my-11">
              <h2 className="font-bold text-3xl mb-2">Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <YouTubeEmbed videoId="LQhHyCHrgYQ" />
                <YouTubeEmbed videoId="m2fMergvliY" />
                <YouTubeEmbed videoId="MGhxgaKM07Y" />
              </div>
            </div>
            <div className="shadow dark:shadow-white rounded-lg p-6">
              <div className="items-center mb-4">
                <p className="md:text-lg font-semibold">Customer Reviews</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reviews */}
              </div>
            </div>
          </div>
          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">
            <BuyProductsCta
              handleBookNowClick={handleBookNowClick}
              productTypes={product.productTypes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
