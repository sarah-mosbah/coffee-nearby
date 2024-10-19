import { CoffeeStoreType, MapBoxType } from "@/app/types";

const transformCoffeeStore = (
  result: MapBoxType,
  photos: Array<string>,
  idx: number
) => {
  return {
    id: result.id,
    address: result.properties?.address || "Dubai",
    name: result.text,
    imageUrl: photos[idx],
  };
};

export const fetchCoffeeStores = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?proximity=55.296249,25.276987&access_token=${process.env.MAP_BOX_API}`
    );

    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();

    return data.features
      .filter((res: MapBoxType) => !res.text.toLowerCase().includes("star"))
      .map((result: MapBoxType, idx: number) =>
        transformCoffeeStore(result, photos, idx)
      );
  } catch (error: unknown) {
    console.error(`Error Occured while fetching Data ${error}`);
  }
};

export const fetchCoffeeStore = async (id: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?access_token=${process.env.MAP_BOX_API}`
  );

  const data = await response.json();
  const photos = await getListOfCoffeeStorePhotos();

  const transformedData: CoffeeStoreType[] = data.features.map(
    (result: MapBoxType, idx: number) =>
      transformCoffeeStore(result, photos, idx)
  );

  return transformedData.length > 0
    ? transformedData[0]
    : ({} as CoffeeStoreType);
};

const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10&orientation=landscape`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map((result: { urls: any }) => result.urls["small"]);
  } catch (error) {
    console.error("Error retrieving a photo", error);
  }
};
