import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CoffeeStoreType, Props } from "@/app/types";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/app/lib/coffee-stores";
import { DUBAI_LONG_LAT } from "@/app/lib/constants";
import { createCoffeeStore } from "@/app/lib/airtable";
import Upvote from "@/components/up-vote.client";
import { Metadata } from "next";
import { getDomain } from "@/app/utils";

const getData = async (id: string): Promise<CoffeeStoreType> => {
  const mapBoxCoffeStore = await fetchCoffeeStore(id);

  const coffeeStore = await createCoffeeStore(id, mapBoxCoffeStore);
  const voting = coffeeStore.voting ?? 0;

  return { ...mapBoxCoffeStore, voting };
};

export async function generateStaticParams() {
  const response: CoffeeStoreType[] = await fetchCoffeeStores(
    DUBAI_LONG_LAT,
    10
  );

  return response.map((coffee) => ({ id: coffee.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const mapBoxCoffeStore = await fetchCoffeeStore(id);

  const { name = "" } = mapBoxCoffeStore;
  return {
    title: name,
    description: `${name} Coffee Store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${params.id}`,
    },
  };
}

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params;
  const { imageUrl = "", address = "", name = "", voting } = await getData(id);

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={740}
            height={360}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={"Coffee Store Image"}
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className="mb-4 flex">
              <p className="pl-2">{address}</p>
            </div>
          )}
          <Upvote coffeeStore={{ voting, id }} />
        </div>
      </div>
    </div>
  );
}
