import type { Metadata } from "next";
import { IBM_Plex_Sans, AR_One_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const arOneSans = AR_One_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ar-one-sans",
});

export const metadata: Metadata = {
  title: "Coffee Nearby",
  description: "Find your perfect cup of coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} ${arOneSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
