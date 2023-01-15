import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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
                <motion.div
                  variants={framerItem}
                  className=" min-h-fit flex flex-col relative justify-between rounded-2xl shadow-2xl cursor-pointer overflow-hidden"
                  key={index}
                  exit={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  // animate={{ opacity: 1 }}
                  initial="hidden"
                  viewport={{ once: true }}
                  onClick={() => {
                    getTitle(object.id);
                    setIsOpen(true);
                    getLocations(object.id);
                  }}
                >
                  <Image
                    loading="eager"
                    src={object.image}
                    width={300}
                    height={300}
                    quality={25}
                    className=" rounded-2xl h-full object-cover w-full"
                    alt={`Poster for ${object.title}`}
                    onClick={() => {
                      getTitle(object.id);
                      setIsOpen(true);
                      getLocations(object.id);
                    }}
                  />
                  <div className="absolute z-10 h-full w-full bottom-0 left-0 bg-gradient-to-t from-black"></div>
                  <div>
                    <p className=" absolute z-20 bottom-0 px-auto w-full pb-2 font-poppins font-bold text-offwhite  text-base px-2 py-1 underline text-center">
                      {object.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
