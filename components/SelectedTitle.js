import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { TfiBackLeft } from "react-icons/tfi";

export default function SelectTitle({
  isOpen,
  selectTitle,
  locations,
  closeModal,
}) {
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
              className=" rounded-full bg-deepRed text-white text-2xl p-1 absolute top-2 right-4 z-30"
            >
              <TfiBackLeft />
            </button>
            <div className="h-full w-full overflow-y-auto">
              <Image
                loading="eager"
                src={selectTitle.image}
                width={300}
                height={300}
                quality={75}
                className=" w-full h-full absolute rounded-3xl top-0 left-0 object-top object-cover"
                alt={`Poster for ${selectTitle.title}`}
              />
              <div className=" bg-gradient-to-t from-darkgrey w-full h-full absolute top-0 left-0 rounded-3xl z-10"></div>

              <Dialog.Description className="relative w-full h-full z-20">
                <div className="grid md:grid-cols-2 gap-5 absolute top-1/2 bg-gradient-to-t from-darkgrey px-2">
                  <div className="">
                    <Dialog.Title className="md:text-5xl font-poppins text-3xl font-bold text-offwhite relative mb-1 z-20">
                      {selectTitle.title}
                    </Dialog.Title>
                    <p className=" text-offwhite font-semibold mb-1 font-poppins">
                      {selectTitle.year}{" "}
                      {!selectTitle.tvSeriesInfo ||
                      selectTitle.tvSeriesInfo.yearEnd === ""
                        ? ""
                        : `- ${selectTitle.tvSeriesInfo.yearEnd}`}
                    </p>
                    <p className=" text-lg font-poppins text-offwhite font-medium">
                      Watch locations
                    </p>
                    <ul className="w-full grid grid-cols-4 gap-5 items-end">
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
                  </div>
                  <div>
                    <p className="text-offwhite font-medium">
                      {!selectTitle.directors
                        ? ""
                        : `Directed by: ${selectTitle.directors}`}
                    </p>
                    <p className="text-offwhite">{selectTitle.plot}</p>
                    {/* DEBUG BUTTON */}
                    {/* <button
                      onClick={() => {
                        console.log(selectTitle), console.log(locations);
                      }}
                    >
                      Log selectTitle
                    </button> */}

                    {/* Cast Start */}

                    <p className=" text-offwhite font-medium my-2 text-lg">
                      Cast
                    </p>
                    <ul className="grid grid-cols-4 gap-2 h-1/3 md:overflow-y-auto">
                      {!selectTitle.actorList || selectTitle.actorList === []
                        ? "No Cast Found"
                        : selectTitle.actorList.map((cast, index) => {
                            return (
                              <>
                                <li key={index}>
                                  <Image
                                    width={100}
                                    height={100}
                                    src={cast.image}
                                    quality={5}
                                    alt={`Headshot of ${cast.name} who plays ${cast.asCharacter}`}
                                    className="object-cover h-28 rounded-md"
                                  />
                                  <p className="text-sm text-white">
                                    {cast.name}
                                  </p>
                                  <p className="text-xs text-white">
                                    {cast.asCharacter}
                                  </p>
                                </li>
                              </>
                            );
                          })}
                    </ul>
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
