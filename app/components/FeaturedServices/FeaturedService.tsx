"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";
import { Services } from "@/models/services";

type Props = {
  featuredService: Services;
};

const FeaturedService: FC<Props> = (props) => {
  const { featuredService } = props;
  return (
    <section className="flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto">
      <div className="md:grid gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-48 mb-4 md:mb-0">
          <Image
            src={featuredService.coverImage.url}
            alt={featuredService.name}
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 h-48">
          {featuredService.images.map((image, index) => (
            <div key={index} className="rounded-2xl overflow-hidden">
              <Image
                src={image.url}
                alt={index + "_sampleImage"}
                width={300}
                height={300}
                className="img scale-animation"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="md:py-10 md:w-1/2 text-left">
        <h3 className="font-heading mb-10">{featuredService.name}</h3>
        <p className="mb-2 text-tertiary-dark font-semibold text-[20px]">
          {featuredService.title}
        </p>
        <p className="font-normal">{featuredService.description}</p>
        <p className="font-normal mt-5 text-tertiary-dark dark:text-tertiary-light">
          {"In Your Neighbourhood, we provide  🚜"}
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between mt-2">
          <div className="flex mb-3 md:mb-0">
            <div className="flex gap-3 flex-col items-center justify-center mr-4">
              <p className="text-xs lg:text-xl text-center">
                {featuredService.metric1Name}
              </p>
              {/* <p className="sm:font-bold font-mediumflex font-medium text-lg xl:text-5xl"> */}
              <CountUpNumber
                endValue={featuredService.metric1Value}
                duration={1000}
                trailingText={featuredService.metric1TrailingText}
              />
              {/* </p>  */}
            </div>
            <div className="flex gap-3 flex-col items-center justify-center ml-4">
              <p className="text-xs lg:text-xl text-center">
                {featuredService.metric2Name}
              </p>
              {/* <p className="sm:font-bold flex font-medium text-lg xl:text-5xl"> */}
              <CountUpNumber
                endValue={featuredService.metric2Value}
                duration={1000}
                trailingText={featuredService.metric2TrailingText}
              />
              {/* </p> */}
            </div>
          </div>
          <Link
            href={`/materials`}
            className="border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 wounded-2xl font-bold "
          >
            {featuredService.hookText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedService;
