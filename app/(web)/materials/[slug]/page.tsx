"use client";

import { getProductDetails } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import BuyProductsCta from "@/app/components/BuyProductsCta/BuyProductsCta";
import { useState } from "react";
import YouTubeEmbed from "@/app/components/YoutubeVideoPlayer/YoutubeVideoPlayer";
import Image from "next/image";
import ProductTypeCard from "@/app/components/ProductTypeCard/ProductTypeCard";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [productCount, setProductCount] = useState(new Map<String, number>());

  const increaseProductCount = (productKey: string) => {
    setProductCount((prevMap) => {
      const newMap = new Map(prevMap); // Create a new Map from the previous Map
      const currentCount = newMap.get(productKey) ?? 0;
      newMap.set(productKey, currentCount + 1 < 100 ? currentCount + 1 : 100);
      return newMap;
    });
  };

  const decreaseProductCount = (productKey: string) => {
    setProductCount((prevMap) => {
      const newMap = new Map(prevMap); // Create a new Map from the previous Map
      const currentCount = newMap.get(productKey) ?? 0;
      newMap.set(productKey, currentCount - 1 > 0 ? currentCount - 1 : 0);
      return newMap;
    });
  };

  const fetchRoom = async () => getProductDetails(slug);

  const { data: product, error, isLoading } = useSWR("/api/product", fetchRoom);

  if (error) throw new Error("Cannot fetch product details");
  if (typeof product === "undefined" && !isLoading)
    throw new Error("Cannot fetch product details");

  if (!product) return <LoadingSpinner />;

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
            <div className="mt-11 mb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {product.productTypes ? (
                  product.productTypes.map((productType) => (
                    <ProductTypeCard
                      key={productType._key}
                      room={productType}
                      productCount={productCount?.get(productType._key) ?? 0}
                      increaseProductCount={() =>
                        increaseProductCount(productType._key)
                      }
                      decreaseProductCount={() =>
                        decreaseProductCount(productType._key)
                      }
                    />
                  ))
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-3xl mb-2">{product.name}</h2>
              <p>{product.description}</p>
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
              // handleBookNowClick={handleBookNowClick}
              productTypes={product.productTypes}
              productCount={productCount}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
