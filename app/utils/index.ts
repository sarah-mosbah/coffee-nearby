export function getDomain(): URL {
  return new URL(
    process.env.NODE_ENV === "production"
      ? "https://coffee-store.vercel.app"
      : "http://localhost:300"
  );
}
