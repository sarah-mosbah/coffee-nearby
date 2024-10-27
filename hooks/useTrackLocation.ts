"use client";

import { useState } from "react";

type Position = {
  coords: {
    longitude: number;
    latitude: number;
  };
};

export const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  const success = (position: Position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setIsFindingLocation(false);

    setLongLat(`${longitude},${latitude}`);

    setLocationErrorMessage("");
  };

  const error = () => {
    setIsFindingLocation(false);
    setLongLat("");
    setLocationErrorMessage("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMessage("Unable to retrieve your location");
      setLongLat("");
    } else {
      setIsFindingLocation(true);
      navigator.geolocation.getCurrentPosition(success, error);
      setLocationErrorMessage("");
    }
  };

  return {
    handleTrackLocation,
    isFindingLocation,
    longLat,
    locationErrorMessage,
  };
};
