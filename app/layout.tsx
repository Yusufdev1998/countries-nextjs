import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import "react-loading-skeleton/dist/skeleton.css";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Countries Website",
  description:
    "Countries Website built with Nextjs14 and tailwindcss using frontend mentor apis.com",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${nunito.className} h-full`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
