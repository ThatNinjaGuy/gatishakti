// AIzaSyC7ueO16fbDnf7eEAzh2h4LisSdewoXhH0;
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  GoogleMap,
  //   LoadScript,
  //   AdvancedMarker,
  //   StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";

const MapComponent = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({
    lat: -34.397,
    lng: 150.644,
  });
  const libraries = useMemo(() => ["places"], []);
  //   const [address, setAddress] = useState("");
  //   const mapOptions = useMemo<google.maps.MapOptions>(
  //     () => ({
  //       disableDefaultUI: true,
  //       clickableIcons: true,
  //       scrollwheel: false,
  //     }),
  //     []
  //   );
  //   const searchBoxRef = useRef<StandaloneSearchBox>(null);

  const onMapLoad = (map: google.maps.Map): void => {
    // Set the map instance
    setMap(map);

    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Set user location
          setLocation(pos);
          // Center map to user location
          map.panTo(pos);
        },
        () => {
          // Handle location error
        }
      );
    }
  };

  //   const onPlacesChanged = () => {
  //     const places = searchBoxRef.current?.getPlaces();
  //     if (places && places.length > 0) {
  //       const place = places[0];
  //       setLocation(place.geometry.location.toJSON());
  //       setAddress(place.formatted_address);
  //       map?.panTo(place.geometry.location.toJSON());
  //     }
  //   };

  // Attempt to get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(pos);
          map?.panTo(pos);
        },
        () => {
          // Handle location error
        }
      );
    }
  }, [map]); // This effect should run once on component mount

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={location}
      zoom={15}
      onLoad={onMapLoad}
    >
      {/* <StandaloneSearchBox
        onLoad={(ref) => {
          searchBoxRef.current = ref;
        }}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter your address"
          style={{ boxSizing: "border-box", width: "240px", height: "32px" }}
        />
      </StandaloneSearchBox> */}
      {/* <AdvancedMarker position={location} draggable={true} /> */}
    </GoogleMap>
  );
};

export default MapComponent;
