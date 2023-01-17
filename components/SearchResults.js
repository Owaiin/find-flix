import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ResultCard from "./ResultCard";

export default function SearchResults({
  getTitle,
  data,
  setIsOpen,
  getLocations,
  checkRelatedTitles,
}) {
  const framerContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const framerItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <div>
        <AnimatePresence>
          <motion.div
            variants={framerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 grid-cols-2 gap-6  w-full"
          >
            {data.map((object, index) => {
              return (
                <ResultCard
                  id={object.id}
                  image={object.image}
                  title={object.title}
                  key={index}
                  getLocations={getLocations}
                  setIsOpen={setIsOpen}
                  getTitle={getTitle}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
