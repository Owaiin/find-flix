import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function ResultCard({
  id,
  image,
  title,
  getTitle,
  setIsOpen,
  getLocations,
}) {
  return (
    <>
      {/* Card Wrapper */}
      <div
        className="min-h-full flex flex-col relative justify-between rounded-2xl shadow-2xl cursor-pointer overflow-hidden"
        onClick={() => {
          getTitle(id);
          setIsOpen(true);
          getLocations(id);
        }}
      >
        <Image
          loading="eager"
          className=" rounded-2xl h-full object-cover w-full"
          src={image}
          width={300}
          height={300}
          quality={50}
          alt={`Click to watch ${title}`}
        />
        {/* Overlay */}
        <div className="absolute z-10 h-full w-full bottom-0 left-0 bg-gradient-to-t from-black opacity-80"></div>
        <h2 className=" absolute z-20 bottom-0 px-auto w-full pb-2 font-poppins font-bold text-offwhite  text-base px-2 py-1 underline text-center">
          {title}
        </h2>
      </div>
    </>
  );
}
