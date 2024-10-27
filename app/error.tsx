"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>
        You need to configure your env variable MAP_BOX_API UNSPLASH_ACCESS_KEY
        AIRTABLE_TOKEN inside your .env file
      </p>
    </div>
  );
}
