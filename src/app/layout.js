'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/navMenu";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <main>
        {pathname != "/display" && <NavMenu />}
        {children}
      <hr className=" w-screen h-2 bg-black border-black mb-5"></hr>
      <footer className=" w-screen pb-3 text-sm text-gray-600 flex items-center justify-center">
        <p
          className="flex items-center gap-2"
        >
          Created by Middlebury College Students and Supported By MiddData
        </p>
      </footer>
      </main>
      </body>
    </html>
  );
}
