import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Maker Space Garden",
  description: "A place to view the status of Middlebury College's Maker Space Garden located in Johnson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <main>
        {children}
      <hr className="h-2 bg-black border-black mb-5"></hr>
      <footer className=" pb-3 text-sm text-gray-600 flex items-center justify-center">
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
