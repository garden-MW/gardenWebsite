/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import EmblaCarousel from "@/components/carousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center w-full md:w-[70%] p-24 space-y-4">
          <h1 className=" font-serif font-bold shadow-lg text-zinc-50 text-3xl text-center mb-5">Welcome to the Maker Space Garden!</h1>
          <p className="font-serif text-gray-700 text-lg text-center text-pretty text border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md">
          Our garden is a Hydroponic Plant System, a project developed by students from Middlebury College. This innovative system combines sustainable practices with cutting-edge technology to create a self-sufficient growing environment for plants, all without soil. On this site, you'll find data on our system's design and performance showcasing the hard work and creativity of our student team. Feel free to explore times to come visit the garden in person, we would love to have you!
          </p>

          <h2 className=" font-serif pt-10 text-xl font-bold text-zinc-50 text-center">Get Started with an overview of how our plants are fairing!</h2>
          <a
            className=" font-serif shadow-md rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-lg h-10 sm:h-12 px-4 sm:px-5"
            href="./overview"
            rel="noopener noreferrer"
          >
            Overview
          </a>
          <EmblaCarousel />
        </div>
    </div>
  );
}
