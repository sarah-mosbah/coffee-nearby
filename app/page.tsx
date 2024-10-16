import Banner from "@/components/banner.client";
import Card from "@/components/card.server";
import Link from "next/link";

export default function Home() {
  const coffeeStoreId = "tbs";

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Banner />
        <div>
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Toronto Coffee Stores
          </h2>
          <Card
            name="The Best Store"
            href={`/coffee-store/${coffeeStoreId}`}
            image="/static/hero-image.png"
          />
        </div>
      </main>
    </div>
  );
}
