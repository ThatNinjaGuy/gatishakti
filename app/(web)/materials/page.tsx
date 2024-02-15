"use client";

import RoomCard from "@/app/components/RoomCard/RoomCard";
import Search from "@/app/components/Search/Search";
import { getRooms } from "@/libs/apis";
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

  async function fetchData() {
    return getRooms();
  }
  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);
  if (error) throw new Error("Cannot fetch rooms!");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch rooms!");

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter((room) => {
      // Apply room filters and search criterias
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredRooms = filterRooms(data || []);

  return (
    <div className="container mx-auto ">
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className="mt-10 px-4 sm:px-0 text-center sm:text-left text-tertiary-dark font-semibold text-[30px]">
        Buy Sand
      </div>
      <div className="flex mt-5 justify-between flex-wrap">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
      <div className="mt-10 px-4 sm:px-0 text-center sm:text-left text-tertiary-dark font-semibold text-[30px]">
        Buy Bricks
      </div>
      <div className="flex mt-5 justify-between flex-wrap">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
      <div className="mt-10 px-4 sm:px-0 text-center sm:text-left text-tertiary-dark font-semibold text-[30px]">
        Buy Cement
      </div>
      <div className="flex mt-5 justify-between flex-wrap">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Materials;
