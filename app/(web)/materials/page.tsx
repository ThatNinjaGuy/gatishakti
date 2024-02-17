"use client";

import RoomCard from "@/app/components/RoomCard/RoomCard";
import Search from "@/app/components/Search/Search";
import { getConstructionMaterials, getRooms } from "@/libs/apis";
import { ConstructionMaterial } from "@/models/constructtionmaterial";
import { Room } from "@/models/room";
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
    "get/hotelRooms",
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
      <div>
        {filteredConstructionMaterials &&
        filteredConstructionMaterials.length > 0 ? (
          filteredConstructionMaterials.map((material) => (
            <div>
              <div className="mt-10 px-4 sm:px-0 text-center sm:text-left text-tertiary-dark font-semibold text-[30px]">
                {material.name}
              </div>
              <div className="flex mt-5 justify-between flex-wrap">
                {material.products.map((product) => (
                  <RoomCard key={product._key} product={product} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No Data found</div>
        )}
      </div>
    </div>
  );
};

export default Materials;
