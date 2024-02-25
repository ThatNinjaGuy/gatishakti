"use client";

import ProductCard from "@/app/components/ProductCard/ProductCard";
import Search from "@/app/components/Search/Search";
import { ConstructionMaterial } from "@/models/constructionMaterial";
import { FC } from "react";

type Props = {
  constructionMaterials: ConstructionMaterial[];
};

const MarketPlace: FC<Props> = (props) => {
  const { constructionMaterials } = props;

  return (
    <div>
      {constructionMaterials && constructionMaterials.length > 0 ? (
        constructionMaterials.map((material) => (
          <div key={material._id}>
            <div className="mt-10 px-4 sm:px-0 text-center sm:text-left text-tertiary-dark font-semibold text-[30px]">
              {material.name}
            </div>
            <div className="flex mt-5 justify-between flex-wrap">
              {material.products.map((product) => (
                <ProductCard key={product._key} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>No Data found</div>
      )}
    </div>
  );
};

export default MarketPlace;
