import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries: "places"[] = ["places"]; // Correct type for libraries prop

const MapComponent = () => {
  const [map, setMap] = useState<google.maps.Map>(); // Type for map
  const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
  const [address, setAddress] = useState("");
  const searchBoxRef = useRef<StandaloneSearchBox>(); // Ref for the search box

  const onMapLoad = (map: google.maps.Map) => {
    // Type for map
    setMap(map);
  };

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = (searchBoxRef.current as any).getPlaces();
      if (places && places.length === 0) {
        return;
      }
      const place = places && places[0];
      if (place) {
        setLocation(place.geometry.location);
        setAddress(place.formatted_address);
        map?.panTo(place.geometry.location);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={location}
        zoom={15}
        onLoad={onMapLoad}
      >
        {/* Bind the search box component to the ref */}
        <StandaloneSearchBox
          onLoad={(ref: any) => (searchBoxRef.current = ref)}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Enter your address"
            style={{ boxSizing: "border-box", width: "240px", height: "32px" }}
          />
        </StandaloneSearchBox>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
