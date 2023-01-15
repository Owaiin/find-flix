import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { TfiBackLeft } from "react-icons/tfi";
import { useRef } from "react";

export default function SelectTitle({
  isOpen,
  selectTitle,
  locations,
  closeModal,
  getTitle,
  setIsOpen,
  getLocations,
}) {
  const goToTop = () => {
    window.scrollTo({
      top: document.getElementById("title"),
      behaviour: "smooth",
    });
  };
  return (
    <>
      <Dialog
        className="relative z-50"
        open={isOpen}
        onClose={() => closeModal()}
      >
        {/* Center the modal */}
        <motion.div
          initial={{
            y: 100,
            opacity: 0.5,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{ y: 0 }}
          className=" fixed inset-0 flex items-center justify-center pt-5 bg-opacity-70 bg-black"
        >
          <Dialog.Panel className="w-full max-w-5xl rounded-3xl bg-black  h-full relative">
            <button
              onClick={() => closeModal()}
              id="backButton"
              className=" rounded-full bg-deepRed text-white text-2xl p-1 absolute top-4 right-4 z-30"
            >
              <TfiBackLeft />
            </button>
            <div className="h-full w-full overflow-y-auto">
              <Image
                loading="eager"
                src={selectTitle.image}
                width={300}
                height={300}
                quality={50}
                className=" w-full h-full absolute rounded-3xl top-0 left-0 object-top object-cover"
                alt={`Poster for ${selectTitle.title}`}
              />
              <div className=" bg-gradient-to-t from-darkgrey w-full h-full absolute top-0 left-0 rounded-3xl z-10"></div>

              <Dialog.Description className="relative w-full h-full z-20">
                <div
                  id="info-wrapper"
                  className="grid md:grid-cols-2 gap-5 absolute top-1/2 rounded-tl-2xl rounded-tr-2xl"
                >
                  <div className=" ">
                    <Dialog.Title
                      id="title"
                      className="md:text-5xl px-2 font-poppins text-3xl font-bold text-offwhite relative mb-1 z-20"
                    >
                      {selectTitle.title}
                    </Dialog.Title>
                    <p className="px-2 text-offwhite font-semibold mb-1 font-poppins">
                      {selectTitle.year}{" "}
                      {!selectTitle.tvSeriesInfo ||
                      selectTitle.tvSeriesInfo.yearEnd === ""
                        ? ""
                        : `- ${selectTitle.tvSeriesInfo.yearEnd}`}
                    </p>
                    <p className=" px-2 text-lg font-poppins text-offwhite font-medium">
                      Watch locations
                    </p>
                    <ul className="w-full grid grid-cols-4 px-2 gap-5 items-end mb-3">
                      {locations ? (
                        locations.map((location, index) => {
                          return (
                            <>
                              <li key={index}>
                                <a
                                  key={index}
                                  target="_blank"
                                  href={location.url}
                                >
                                  <Image
                                    className=" filter brightness-100 contrast-200 invert"
                                    height={50}
                                    width={100}
                                    quality={10}
                                    alt={`Icon for ${location.display_name}`}
                                    src={location.icon}
                                  />
                                </a>
                              </li>
                            </>
                          );
                        })
                      ) : (
                        <p className="text-white col-span-4">
                          {" "}
                          No streaming services available at this time{" "}
                        </p>
                      )}
                    </ul>
                    {/* WATCH LOCATIONS END */}
                    <div className=" bg-gradient-to-t from-darkgrey via-darkgrey">
                      <div className="px-2">
                        <p className="text-offwhite font-medium">
                          {!selectTitle.directors
                            ? ""
                            : `Directed by: ${selectTitle.directors}`}
                        </p>
                        <p className="text-offwhite mb-5">{selectTitle.plot}</p>
                      </div>
                      {/* SIMILAR TITLES */}
                      <ul className="grid grid-cols-2 gap-5 px-2 py-3 bg-gradient-to-t from-darkgrey via-darkgrey ">
                        {!selectTitle.similars
                          ? ""
                          : selectTitle.similars.map((similar, index) => {
                              return (
                                <>
                                  <li
                                    key={index}
                                    className="min-h-fit flex flex-col justify-between bg-deepRed rounded-2xl shadow-2xl"
                                  >
                                    <Image
                                      src={similar.image}
                                      width={200}
                                      height={200}
                                      quality={10}
                                      alt={`Similar movie: ${similar.title}`}
                                      className="rounded-2xl h-full object-cover"
                                      onClick={() => {
                                        getTitle(similar.id);
                                        setIsOpen(true);
                                        getLocations(similar.id);
                                        goToTop();
                                      }}
                                    />
                                    <p className=" font-poppins font-bold text-offwhite text-base px-2 py-1 underline text-center">
                                      {similar.title}
                                    </p>
                                  </li>
                                </>
                              );
                            })}
                      </ul>
                    </div>
                  </div>

                  {/* End of grid below */}
                </div>
              </Dialog.Description>
            </div>
          </Dialog.Panel>
        </motion.div>
      </Dialog>
    </>
  );
}