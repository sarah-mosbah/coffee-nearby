"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

export default function Upvote({ voting }: { voting: number }) {
  return (
    <>
      <div className="flex mb-6">
        <Image src="/static/star.svg" width="24" height="24" alt="star icon" />
        <p className="pl-2">{voting}</p>
      </div>

      <button type="submit" className="bg-purple-951 min-w-[120px]">
        Up vote!
      </button>
    </>
  );
}
