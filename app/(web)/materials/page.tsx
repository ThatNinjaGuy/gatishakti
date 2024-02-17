"use client";

import MarketPlace from "@/app/components/MarketPlace/MarketPlace";
import Search from "@/app/components/Search/Search";
import { getConstructionMaterials, getRooms } from "@/libs/apis";
import { ConstructionMaterial } from "@/models/constructtionmaterial";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import useSWR from "swr";

const Materials = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQueryValue = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");
    if (roomType) setRoomTypeFilter(roomType);
    if (searchQueryValue) setSearchQuery(searchQueryValue);
  }, []);

  async function fetchConstructionMaterials() {
    return getConstructionMaterials();
  }

  const { data, error, isLoading } = useSWR(
    "get/marketProducts",
    fetchConstructionMaterials
  );
  if (error) throw new Error("Cannot fetch construction materials!");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch construction materials!");

  const filterMaterials = (materials: ConstructionMaterial[]) => {
    // return rooms.filter((room) => {
    //   // Apply room filters and search criterias
    //   if (
    //     roomTypeFilter &&
    //     roomTypeFilter.toLowerCase() !== "all" &&
    //     room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
    //   ) {
    //     return false;
    //   }

    //   if (
    //     searchQuery &&
    //     !room.name.toLowerCase().includes(searchQuery.toLowerCase())
    //   ) {
    //     return false;
    //   }

    //   return true;
    // });
    return materials;
  };

  const filteredConstructionMaterials = filterMaterials(data || []);

  return (
    <div className="container mx-auto ">
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />
      <MarketPlace constructionMaterials={filteredConstructionMaterials} />
    </div>
  );
};

export default Materials;
