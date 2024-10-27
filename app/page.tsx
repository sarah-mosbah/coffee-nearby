import Card from "@/components/card.server";
import { fetchCoffeeStores } from "./lib/coffee-stores";
import { CoffeeStoreType } from "@/app/types";
import NearbyStores from "@/components/nearby-stores.client";
import { DUBAI_LONG_LAT } from "./lib/constants";

const getData = async (): Promise<CoffeeStoreType[]> => {
  if (
    !process.env.MAP_BOX_API ||
    !process.env.UNSPLASH_ACCESS_KEY ||
    !process.env.AIRTABLE_TOKEN
  ) {
    throw new Error("Api Key is Missing");
  }

  return fetchCoffeeStores(DUBAI_LONG_LAT, 10);
};

export default async function Home() {
  const coffeeStores = await getData();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Dubai Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((coffeeStore, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imageUrl={coffeeStore.imageUrl}
                href={`/coffee-store/${coffeeStore.id}?id=${idx}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
