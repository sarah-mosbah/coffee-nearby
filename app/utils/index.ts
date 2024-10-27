export function getDomain(): URL {
  return new URL(
    process.env.NODE_ENV === "production"
      ? "https://coffee-nearby-lqr4-eomq0tmdm-sarah-mosbahs-projects.vercel.app/"
      : "http://localhost:300"
  );
}
