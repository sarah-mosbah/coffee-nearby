"use client";
import React, { useEffect, useState } from "react";
import Banner from "./banner.client";
import { useTrackLocation } from "@/hooks/useTrackLocation";

import Card from "./card.server";
import { CoffeeStoreType } from "@/app/types";
export default function NearbyStores() {
  const {
    handleTrackLocation,
    isFindingLocation,
    locationErrorMessage,
    longLat,
  } = useTrackLocation();

  const [coffeesNearby, setCoffeesNearby] = useState([] as CoffeeStoreType[]);

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const fetchStoresNearby = async () => {
      try {
        if (longLat) {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=10`
          );

          const coffeStores: CoffeeStoreType[] = await response.json();

          setCoffeesNearby(coffeStores);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchStoresNearby();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View Stores Nearby"}
      />

      {locationErrorMessage && <p>Error: {locationErrorMessage}</p>}

      {coffeesNearby.length > 0 && (
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Stores Near Me
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeesNearby.map((coffeeStore, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imageUrl={coffeeStore.imageUrl}
                href={`/coffee-store/${coffeeStore.id}?id=${idx}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
