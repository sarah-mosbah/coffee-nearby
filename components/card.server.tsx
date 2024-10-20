import React from "react";
import Image from "next/image";
import Link from "next/link";
type CardType = {
  name: string;
  href: string;
  imageUrl: string;
};

export default function Card(props: CardType) {
  const { name, href, imageUrl } = props;
  return (
    <Link href={href} className="m-auto rounded-xl border-gray-400 shadow-2xl">
      <div className="glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl">
        <div className="my-3">
          <h2 className="w-64 text-ellipsis truncate text-xl font-bold">
            {name}
          </h2>
        </div>
        <div className="relative w-full h-48">
          <Image
            className="rounded-lg shadow-lg"
            src={imageUrl}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            layout="fill"
            objectFit="cover"
            alt={"Coffee Store Image"}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+ZNPQAIoQM4xp5zkgAAAABJRU5ErkJggg=="
            placeholder="blur"
          />
        </div>
      </div>
    </Link>
  );
}
