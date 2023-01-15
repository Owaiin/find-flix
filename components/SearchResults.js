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
                  className=" min-h-fit flex flex-col justify-between bg-deepRed rounded-2xl shadow-2xl cursor-pointer"
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
                  <div>
                    <p className=" font-poppins font-bold text-offwhite  text-base px-2 py-1 underline text-center">
                      {object.title}
                    </p>
                    {/* <p className="mb-2 ">{object.description}</p> */}

                    {/* <button
                      onClick={() => {
                        getTitle(object.id);
                        setIsOpen(true);
                        getLocations(object.id);
                      }}
                      className=" bg-deepRed py-2 px-4 rounded-md mt-2 w-full font-medium text-white"
                    >
                      More info
                    </button> */}
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
//   <div>
//     <AnimatePresence>
//       <motion.div
//         variants={framerContainer}
//         initial="hidden"
//         animate="visible"
//         className="grid md:grid-cols-4 grid-cols-1 gap-6  w-full"
//       >
//         {props.data.map((object, index) => {
//           return (
//             <motion.div
//               variants={framerItem}
//               className=" min-h-fit flex flex-col justify-between bg-white p-4 rounded-2xl shadow-2xl"
//               key={index}
//               exit={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               // animate={{ opacity: 1 }}
//               initial="hidden"
//               viewport={{ once: true }}
//             >
//               <Image
//                 loading="eager"
//                 src={object.image}
//                 width={300}
//                 height={300}
//                 quality={25}
//                 className=" rounded-2xl h-3/4 object-cover w-full"
//                 alt={`Poster for ${object.title}`}
//               />
//               <div>
//                 <p className=" font-bold text-xl">{object.title}</p>
//                 <p className="mb-2 ">{object.description}</p>

//                 <button
//                   onClick={() => {
//                     getTitle(object.id);
//                     setIsOpen(true);
//                     getLocations(object.id);
//                   }}
//                   className=" bg-slate-500 py-2 px-4 rounded-2xl font-medium text-white"
//                 >
//                   More info
//                 </button>
//               </div>
//             </motion.div>
//           );
//         })}
//       </motion.div>
//     </AnimatePresence>
//   </div>;
// }
