import { Inter } from "next/font/google";
import "./styles/reset.scss";
import "./styles/global.scss";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { getBookTitles } from "./lib/utils";
import { textbooks } from "./lib/data";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "BDBooks | %s",
    default: "BDBooks",
  },
  description: "Download and Read Bangla Books for FREE !!!",
  keywords: [
    "Bangla Books for FREE",
    "Download and Read Bangla Books",
    "Download and Read Bangla Books for FREE !!!",
    "Humayun Ahmed books",
    ...getBookTitles(textbooks),
  ],
  icons: [
    { rel: "icon", url: "/images/favicon/favicon.ico" },
    { rel: "icon", url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    {
      rel: "icon",
      url: "/images/favicon/favicon-32x32.png",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/images/favicon/favicon-16x16.png",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/images/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
  manifest: "/site.webmanifest",
  creator: "Muhammed Faris P - Managed by Siam",
  metadataBase: new URL("https://bdbooks.vercel.app"),
  openGraph: {
    title: "BDBooks",
    description: "Download and Read Bangla Books for FREE !!!",
    type: "website",
    url: "https://bdbooks.vercel.app",
    siteName: "BDBooks",
    countryName: "Bangladesh",
  },
  authors: [{ name: "Siam" }],
  twitter: {
    description: "Download and Read Bangla Books for FREE !!!",
    card: "summary_large_image",
    site: "https://bdbooks.vercel.app",
  },
  verification: {
    google: "     ",
  },
  alternates: {
    canonical: "https://bdbooks.vercel.app",
  },
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
  appleMObileWebAppStatusBarStyle: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
